import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, LogOut, Home, Check, Clock } from 'lucide-react';
import ElectionCard from '../components/ElectionCard';
import Loader from '../components/Loader';
import { userApi } from '../services/api';

function DashboardPage() {
  const navigate = useNavigate();
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const loadElections = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await userApi.elections();
      setElections(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load elections');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadElections();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Categorize elections
  const activeElections = elections.filter(e => {
    const now = new Date();
    return new Date(e.startTime) <= now && new Date(e.endTime) >= now;
  });
  const upcomingElections = elections.filter(e => new Date(e.startTime) > new Date());
  const completedElections = elections.filter(e => new Date(e.endTime) < new Date());

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between sm:px-6">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Shield className="h-6 w-6 text-slate-900" />
            <span className="text-lg font-bold text-slate-900">SecureVote</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">{user.name || 'Voter'}</p>
              <p className="text-xs text-slate-500">Authenticated Voter</p>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="mb-12">
            <div className="mb-6 flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-emerald-500" />
              <span className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                Voter Dashboard
              </span>
            </div>

            <div className="grid gap-8 lg:grid-cols-3 lg:gap-12 mb-12">
              <div>
                <h1 className="mb-2 text-4xl font-black text-slate-900 sm:text-5xl">
                  Welcome back,
                  <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {user.name || 'Voter'}
                  </span>
                </h1>
                <p className="text-lg text-slate-600">Your voting dashboard with real-time election updates</p>
              </div>

              {/* Stats Cards */}
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-blue-900">Active Elections</h3>
                  <Check className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-3xl font-black text-blue-900">{activeElections.length}</p>
                <p className="text-xs text-blue-700 mt-1">Voting now</p>
              </div>

              <div className="rounded-xl border border-purple-200 bg-purple-50 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-purple-900">Upcoming</h3>
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <p className="text-3xl font-black text-purple-900">{upcomingElections.length}</p>
                <p className="text-xs text-purple-700 mt-1">Coming soon</p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-6 bg-rose-50 border border-rose-200 rounded-xl">
              <p className="text-sm font-semibold text-rose-900">Failed to Load Elections</p>
              <p className="text-sm text-rose-700 mt-1">{error}</p>
              <button
                onClick={loadElections}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-rose-600 text-white text-sm font-semibold rounded-lg hover:bg-rose-700 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <Loader text="Loading elections..." />
            </div>
          )}

          {/* Elections Sections */}
          {!loading && !error && elections.length > 0 && (
            <>
              {/* Active Elections */}
              {activeElections.length > 0 && (
                <section className="mb-16">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                      <h2 className="text-2xl font-bold text-slate-900">Vote Now</h2>
                    </div>
                    <p className="text-slate-600">Elections currently open for voting</p>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {activeElections.map((election) => (
                      <ElectionCard key={election._id} election={election} />
                    ))}
                  </div>
                </section>
              )}

              {/* Upcoming Elections */}
              {upcomingElections.length > 0 && (
                <section className="mb-16">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <h2 className="text-2xl font-bold text-slate-900">Coming Soon</h2>
                    </div>
                    <p className="text-slate-600">Elections scheduled for future voting</p>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {upcomingElections.map((election) => (
                      <ElectionCard key={election._id} election={election} />
                    ))}
                  </div>
                </section>
              )}

              {/* Completed Elections */}
              {completedElections.length > 0 && (
                <section>
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="h-5 w-5 text-slate-400" />
                      <h2 className="text-2xl font-bold text-slate-900">Completed</h2>
                    </div>
                    <p className="text-slate-600">Elections where voting has ended</p>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {completedElections.map((election) => (
                      <ElectionCard key={election._id} election={election} />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          {/* Empty State */}
          {!loading && !error && elections.length === 0 && (
            <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-200">
                <Home className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">No Elections Available</h3>
              <p className="text-slate-600 mb-6">There are currently no elections to vote in. Check back soon!</p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default DashboardPage;
