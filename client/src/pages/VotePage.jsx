import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Shield, CheckCircle, Clock, User, ArrowLeft, Lock, Zap } from 'lucide-react';
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
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <nav className="border-b border-slate-200/50 bg-white/80 backdrop-blur-md">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            <Link to="/dashboard" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-semibold">Back</span>
            </Link>
          </div>
        </nav>
        <div className="px-4 py-12 sm:px-6 sm:py-24">
          <Loader text="Loading election details..." />
        </div>
      </main>
    );
  }

  if (!election || error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <nav className="border-b border-slate-200/50 bg-white/80 backdrop-blur-md">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            <Link to="/dashboard" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-semibold">Back</span>
            </Link>
          </div>
        </nav>
        <div className="px-4 py-12 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8">
              <p className="text-lg font-semibold text-rose-900">{error || 'Election unavailable'}</p>
              <button
                onClick={() => navigate('/dashboard')}
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-rose-600 text-white font-bold rounded-lg hover:bg-rose-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const selectedCandidate = election.candidates.find(c => c._id === candidateId);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <nav className="border-b border-slate-200/50 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between sm:px-6">
          <Link to="/dashboard" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-semibold text-blue-700">ENCRYPTED VOTING</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl">
          {/* Election Header */}
          <div className="mb-12">
            <div className="mb-6 flex items-center gap-2">
              <Zap className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                Cast Your Vote
              </span>
            </div>

            <h1 className="mb-4 text-4xl font-black text-slate-900 sm:text-5xl">
              {election.title}
            </h1>
            <p className="text-lg text-slate-600 mb-8">{election.description}</p>

            {/* Election Info Cards */}
            <div className="grid gap-4 md:grid-cols-3 mb-8">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">Duration</span>
                </div>
                <p className="text-sm text-slate-600">
                  {new Date(election.startTime).toLocaleDateString()} -{' '}
                  {new Date(election.endTime).toLocaleDateString()}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-3 mb-2">
                  <User className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm font-semibold text-slate-700">Candidates</span>
                </div>
                <p className="text-sm text-slate-600">{election.candidates.length} candidates</p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="h-5 w-5 text-teal-600" />
                  <span className="text-sm font-semibold text-slate-700">Status</span>
                </div>
                <p className="text-sm text-slate-600">Ready to vote</p>
              </div>
            </div>
          </div>

          {/* Voting Form */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Candidates List */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Select a Candidate</h2>
                <p className="text-slate-600">Click on a candidate card to select them</p>
              </div>

              <form onSubmit={submitVote} className="space-y-4">
                {/* Candidates */}
                <div className="space-y-3">
                  {election.candidates.map((candidate) => (
                    <label
                      key={candidate._id}
                      className={`block p-6 rounded-xl border-2 cursor-pointer transition-all ${
                        candidateId === candidate._id
                          ? 'border-blue-500 bg-blue-50 shadow-lg'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <div
                            className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${
                              candidateId === candidate._id
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-slate-300'
                            }`}
                          >
                            {candidateId === candidate._id && (
                              <CheckCircle className="h-4 w-4 text-white" />
                            )}
                          </div>
                        </div>
                        <div className="flex-grow">
                          <input
                            type="radio"
                            name="candidate"
                            value={candidate._id}
                            checked={candidateId === candidate._id}
                            onChange={(event) => setCandidateId(event.target.value)}
                            className="hidden"
                          />
                          <h3 className="text-lg font-bold text-slate-900">{candidate.name}</h3>
                          <p className="text-sm text-slate-600 mt-1">{candidate.party}</p>
                        </div>
                        {candidateId === candidate._id && (
                          <div className="flex-shrink-0 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                            Selected
                          </div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg">
                    <p className="text-sm font-medium text-rose-800">{error}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <button
                    disabled={submitting || !candidateId}
                    className="flex-grow bg-gradient-to-r from-blue-600 to-emerald-600 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed py-4 px-6 text-base font-bold text-white rounded-lg transition-all flex items-center justify-center gap-2"
                    type="submit"
                  >
                    {submitting ? (
                      <>
                        <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Encrypting & Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        Cast Encrypted Vote
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className="px-6 py-4 border-2 border-slate-200 text-slate-900 font-bold rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            {/* Summary Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Vote Summary</h3>

                {selectedCandidate ? (
                  <div className="space-y-4">
                    <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
                      <p className="text-xs font-semibold text-blue-700 mb-1">Your Selection</p>
                      <p className="text-xl font-bold text-slate-900">{selectedCandidate.name}</p>
                      <p className="text-sm text-blue-700 mt-2 font-semibold">{selectedCandidate.party}</p>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                      <Lock className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-emerald-700">Encryption Status</p>
                        <p className="text-sm text-emerald-700">Will be encrypted with AES-256</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg bg-slate-100 p-6 text-center">
                    <User className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-slate-600">Select a candidate to proceed</p>
                  </div>
                )}

                {/* Security Badge */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="text-xs font-semibold text-slate-700">Secure Voting</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Your vote is protected by military-grade encryption. You'll receive a proof hash after submission.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default VotePage;
