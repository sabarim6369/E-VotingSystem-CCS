import { Election } from '../models/Election.js';
import { Candidate } from '../models/Candidate.js';
import { Vote } from '../models/Vote.js';
import { User } from '../models/User.js';
import { encryptVote, decryptVote, buildVoteHash } from '../utils/cryptoUtils.js';

const nowWithinElectionWindow = (election) => {
  const now = new Date();
  return now >= election.startTime && now <= election.endTime;
};

export const getElectionsForUser = async (req, res, next) => {
  try {
    const elections = await Election.find().sort({ createdAt: -1 }).lean();
    const user = await User.findById(req.user.id).select('votedElections').lean();

    const data = await Promise.all(
      elections.map(async (election) => {
        const candidates = await Candidate.find({ electionId: election._id }).lean();
        const hasVoted = user.votedElections.some(
          (id) => id.toString() === election._id.toString()
        );

        return {
          ...election,
          candidates,
          hasVoted,
          canVote: election.status === 'Active' && !hasVoted && nowWithinElectionWindow(election)
        };
      })
    );

    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const castVote = async (req, res, next) => {
  try {
    const { electionId } = req.params;
    const { candidateId } = req.body;

    if (!candidateId) {
      return res.status(400).json({ message: 'Candidate is required' });
    }

    const [election, user, candidate] = await Promise.all([
      Election.findById(electionId),
      User.findById(req.user.id),
      Candidate.findOne({ _id: candidateId, electionId })
    ]);

    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }

    if (!candidate) {
      return res.status(400).json({ message: 'Invalid candidate for selected election' });
    }

    if (election.status !== 'Active') {
      return res.status(400).json({ message: 'Election is not active' });
    }

    if (!nowWithinElectionWindow(election)) {
      return res.status(400).json({ message: 'Election is outside active time window' });
    }

    const alreadyVoted = user.votedElections.some((id) => id.toString() === electionId);
    if (alreadyVoted) {
      return res.status(409).json({ message: 'You already voted in this election' });
    }

    const existingVote = await Vote.findOne({ electionId, userId: req.user.id });
    if (existingVote) {
      return res.status(409).json({ message: 'You already voted in this election' });
    }

    const timestamp = new Date();
    const encryptedVote = encryptVote(candidateId);
    const hash = buildVoteHash(candidateId, timestamp);

    await Vote.create({
      electionId,
      encryptedVote,
      hash,
      timestamp,
      userId: req.user.id
    });

    user.votedElections.push(election._id);
    await user.save();

    return res.status(201).json({ message: 'Vote cast successfully', voteHash: hash });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'You already voted in this election' });
    }
    return next(error);
  }
};

export const createElection = async (req, res, next) => {
  try {
    const { title, description, startTime, endTime } = req.body;

    if (!title || !description || !startTime || !endTime) {
      return res.status(400).json({ message: 'All election fields are required' });
    }

    const election = await Election.create({
      title,
      description,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      status: 'Closed'
    });

    return res.status(201).json(election);
  } catch (error) {
    return next(error);
  }
};

export const addCandidate = async (req, res, next) => {
  try {
    const { electionId } = req.params;
    const { name, party } = req.body;

    if (!name || !party) {
      return res.status(400).json({ message: 'Candidate name and party are required' });
    }

    const election = await Election.findById(electionId);
    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }

    const candidate = await Candidate.create({ name, party, electionId });
    return res.status(201).json(candidate);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Candidate already exists in this election' });
    }
    return next(error);
  }
};

export const getAllElectionsAdmin = async (req, res, next) => {
  try {
    const elections = await Election.find().sort({ createdAt: -1 }).lean();

    const data = await Promise.all(
      elections.map(async (election) => {
        const candidates = await Candidate.find({ electionId: election._id }).lean();
        const voteCount = await Vote.countDocuments({ electionId: election._id });
        return { ...election, candidates, voteCount };
      })
    );

    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const setElectionStatus = async (req, res, next) => {
  try {
    const { electionId } = req.params;
    const { status } = req.body;

    if (!['Active', 'Closed'].includes(status)) {
      return res.status(400).json({ message: 'Status must be Active or Closed' });
    }

    const election = await Election.findByIdAndUpdate(electionId, { status }, { new: true });
    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }

    return res.status(200).json(election);
  } catch (error) {
    return next(error);
  }
};

export const getElectionResults = async (req, res, next) => {
  try {
    const { electionId } = req.params;
    const election = await Election.findById(electionId).lean();

    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }

    const [candidates, votes] = await Promise.all([
      Candidate.find({ electionId }).lean(),
      Vote.find({ electionId }).lean()
    ]);

    const tally = {};
    candidates.forEach((candidate) => {
      tally[candidate._id.toString()] = { candidateId: candidate._id, name: candidate.name, votes: 0 };
    });

    votes.forEach((voteDoc) => {
      const decryptedCandidateId = decryptVote(voteDoc.encryptedVote);
      if (tally[decryptedCandidateId]) {
        tally[decryptedCandidateId].votes += 1;
      }
    });

    return res.status(200).json({
      election,
      totalVotes: votes.length,
      results: Object.values(tally)
    });
  } catch (error) {
    return next(error);
  }
};
