import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BarChart3, Users, Shield, Activity } from 'lucide-react';
import Loader from '../../components/Loader';
import { adminApi } from '../../services/api';

function AdminResultsPage() {
  const { electionId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadResults = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await adminApi.results(electionId);
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load results');
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, [electionId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <nav className="border-b border-slate-200/50 bg-white/80 backdrop-blur-md">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            <Link to="/admin/dashboard" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-semibold">Back</span>
            </Link>
          </div>
        </nav>
        <div className="px-4 py-12 sm:px-6 sm:py-24">
          <Loader text="Decrypting and counting votes..." />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <nav className="border-b border-slate-200/50 bg-white/80 backdrop-blur-md">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            <Link to="/admin/dashboard" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-semibold">Back</span>
            </Link>
          </div>
        </nav>
        <div className="px-4 py-12 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8">
              <p className="text-lg font-semibold text-rose-900">{error}</p>
              <Link
                to="/admin/dashboard"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-rose-600 text-white font-bold rounded-lg hover:bg-rose-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!data) {
    return null;
  }

  const winner = data.results.reduce((prev, current) => (prev.votes > current.votes ? prev : current), data.results[0]);
  const totalVotes = data.totalVotes || 0;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <nav className="border-b border-slate-200/50 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between sm:px-6">
          <Link to="/admin/dashboard" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Back to Dashboard</span>
          </Link>
          <Shield className="h-5 w-5 text-purple-600" />
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12">
            <div className="mb-6 flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-purple-500" />
              <span className="text-sm font-semibold uppercase tracking-wider text-purple-700">
                Election Results
              </span>
            </div>

            <h1 className="mb-2 text-4xl font-black text-slate-900 sm:text-5xl">
              {data.election.title}
            </h1>
            <p className="text-lg text-slate-600">{data.election.description}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-3 mb-12">
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <Activity className="h-5 w-5 text-blue-600" />
                <h3 className="text-sm font-semibold text-blue-900">Total Votes Cast</h3>
              </div>
              <p className="text-3xl font-black text-blue-900">{totalVotes}</p>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <Users className="h-5 w-5 text-emerald-600" />
                <h3 className="text-sm font-semibold text-emerald-900">Total Candidates</h3>
              </div>
              <p className="text-3xl font-black text-emerald-900">{data.results.length}</p>
            </div>

            <div className="rounded-xl border border-purple-200 bg-purple-50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <h3 className="text-sm font-semibold text-purple-900">Participation</h3>
              </div>
              <p className="text-3xl font-black text-purple-900">{totalVotes > 0 ? '100%' : '0%'}</p>
            </div>
          </div>

          {/* Results */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-purple-600" />
              Vote Tallies
            </h2>

            <div className="space-y-6">
              {data.results.map((result, index) => {
                const percentage = totalVotes ? (result.votes / totalVotes) * 100 : 0;
                const isWinner = result.candidateId === winner.candidateId && totalVotes > 0;

                return (
                  <div key={result.candidateId} className={`rounded-xl border-2 p-6 transition-all ${
                    isWinner ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white'
                  }`}>
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                            isWinner ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-900'
                          }`}>
                            {index + 1}
                          </span>
                          <div>
                            <h3 className="text-lg font-bold text-slate-900">{result.name}</h3>
                            <p className="text-xs text-slate-600 font-semibold">{result.party}</p>
                          </div>
                          {isWinner && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full">
                              ✓ Winner
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-slate-900">{result.votes}</p>
                        <p className="text-sm text-slate-600 font-semibold">{percentage.toFixed(1)}%</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="overflow-hidden rounded-full bg-slate-200 h-3">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isWinner ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-blue-500 to-emerald-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Security Info */}
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-blue-900 mb-1">Decryption & Audit Trail</h3>
                <p className="text-sm text-blue-800">
                  All votes have been decrypted using the election key. This action is logged in the audit trail. Results are immutable and verifiable.
                </p>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12">
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminResultsPage;
