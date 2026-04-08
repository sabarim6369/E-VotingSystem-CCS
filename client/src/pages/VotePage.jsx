import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { userApi } from '../services/api';

function VotePage() {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const [election, setElection] = useState(null);
  const [candidateId, setCandidateId] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadElection = async () => {
      try {
        const { data } = await userApi.elections();
        const found = data.find((item) => item._id === electionId);
        if (!found) {
          setError('Election not found');
        } else {
          setElection(found);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load election');
      } finally {
        setLoading(false);
      }
    };

    loadElection();
  }, [electionId]);

  const submitVote = async (event) => {
    event.preventDefault();
    if (!candidateId) {
      setError('Please choose a candidate');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const { data } = await userApi.vote(electionId, { candidateId });
      navigate('/confirmation', { state: { voteHash: data.voteHash } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cast vote');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="page-wrap">
        <Loader text="Loading election details..." />
      </main>
    );
  }

  if (!election || error) {
    return (
      <main className="page-wrap">
        <section className="card p-6">
          <p className="text-sm text-rose-600">{error || 'Election unavailable'}</p>
          <button onClick={() => navigate('/dashboard')} className="btn-secondary mt-4">
            Back to Dashboard
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="page-wrap">
      <section className="card p-6">
        <h2 className="mb-2 text-2xl font-bold text-slate-900">{election.title}</h2>
        <p className="mb-6 text-slate-600">{election.description}</p>

        <form onSubmit={submitVote} className="space-y-4">
          {election.candidates.map((candidate) => (
            <label key={candidate._id} className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3">
              <input
                type="radio"
                name="candidate"
                value={candidate._id}
                checked={candidateId === candidate._id}
                onChange={(event) => setCandidateId(event.target.value)}
              />
              <span className="text-slate-800">{candidate.name}</span>
            </label>
          ))}

          {error ? <p className="text-sm text-rose-600">{error}</p> : null}

          <div className="flex flex-wrap gap-3">
            <button disabled={submitting} className="btn-primary" type="submit">
              {submitting ? 'Submitting secure vote...' : 'Submit Vote'}
            </button>
            <button type="button" onClick={() => navigate('/dashboard')} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default VotePage;
