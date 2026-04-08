import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye, LogOut, Shield, Calendar, Users, TrendingUp, ChevronRight, X } from 'lucide-react';
import Loader from '../../components/Loader';
import { adminApi } from '../../services/api';

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newElection, setNewElection] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: ''
  });
  const [candidateInputs, setCandidateInputs] = useState({});

  const resetCandidateInput = (electionId) => {
    setCandidateInputs((prev) => ({
      ...prev,
      [electionId]: { name: '', party: '' }
    }));
  };

  const loadElections = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await adminApi.elections();
      setElections(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load admin elections');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadElections();
  }, []);

  const createElection = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      await adminApi.createElection(newElection);
      setMessage('✓ Election created successfully');
      setNewElection({ title: '', description: '', startTime: '', endTime: '' });
      setShowCreateForm(false);
      loadElections();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create election');
    }
  };

  const addCandidate = async (electionId) => {
    const candidate = candidateInputs[electionId];
    if (!candidate?.name || !candidate?.party) {
      setError('Please enter both candidate name and party name');
      return;
    }

    setMessage('');
    setError('');

    try {
      await adminApi.addCandidate(electionId, { 
        name: candidate.name, 
        party: candidate.party 
      });
      setMessage('✓ Candidate added');
      resetCandidateInput(electionId);
      loadElections();
      setTimeout(() => setMessage(''), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not add candidate');
    }
  };

  const updateStatus = async (electionId, status) => {
    setMessage('');
    setError('');

    try {
      await adminApi.setStatus(electionId, { status });
      setMessage(`✓ Election marked ${status}`);
      loadElections();
      setTimeout(() => setMessage(''), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update status');
    }
  };

  const viewResults = (electionId) => {
    navigate(`/admin/results/${electionId}`);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between sm:px-6">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Shield className="h-6 w-6 text-slate-900" />
            <span className="text-lg font-bold text-slate-900">SecureVote Admin</span>
          </Link>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12">
            <div className="mb-6 flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-purple-500" />
              <span className="text-sm font-semibold uppercase tracking-wider text-purple-700">
                Admin Dashboard
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h1 className="mb-2 text-4xl font-black text-slate-900 sm:text-5xl">
                  Manage
                  <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Elections
                  </span>
                </h1>
                <p className="text-lg text-slate-600">Create elections, manage candidates, and view real-time results</p>
              </div>

              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                <Plus className="h-5 w-5" />
                New Election
              </button>
            </div>
          </div>

          {/* Status Messages */}
          {message && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between">
              <p className="text-sm font-medium text-emerald-800">{message}</p>
              <button onClick={() => setMessage('')} className="text-emerald-600 hover:text-emerald-700">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-lg flex items-center justify-between">
              <p className="text-sm font-medium text-rose-800">{error}</p>
              <button onClick={() => setError('')} className="text-rose-600 hover:text-rose-700">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Create Election Form */}
          {showCreateForm && (
            <div className="mb-12 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Create New Election</h2>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-slate-600" />
                </button>
              </div>

              <form onSubmit={createElection} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Election Title</label>
                    <input
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
                      placeholder="Enter election title"
                      value={newElection.title}
                      onChange={(event) => setNewElection((prev) => ({ ...prev, title: event.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                    <input
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
                      placeholder="Brief description"
                      value={newElection.description}
                      onChange={(event) => setNewElection((prev) => ({ ...prev, description: event.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Start Time</label>
                    <input
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
                      type="datetime-local"
                      value={newElection.startTime}
                      onChange={(event) => setNewElection((prev) => ({ ...prev, startTime: event.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">End Time</label>
                    <input
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
                      type="datetime-local"
                      value={newElection.endTime}
                      onChange={(event) => setNewElection((prev) => ({ ...prev, endTime: event.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-grow px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                  >
                    Create Election
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="px-6 py-3 border-2 border-slate-200 text-slate-900 font-bold rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <Loader text="Loading elections..." />
            </div>
          )}

          {/* Elections List */}
          {!loading && elections.length > 0 && (
            <div className="space-y-6">
              {elections.map((election) => (
                <div key={election._id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">{election.title}</h3>
                          <p className="text-sm text-slate-600">{election.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ${
                      election.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                      election.status === 'Closed' ? 'bg-rose-100 text-rose-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {election.status}
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid gap-4 md:grid-cols-3 mb-6">
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-xs text-slate-600 font-semibold mb-1">Start Time</p>
                      <p className="text-sm text-slate-900 font-bold">{new Date(election.startTime).toLocaleString()}</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-xs text-slate-600 font-semibold mb-1">End Time</p>
                      <p className="text-sm text-slate-900 font-bold">{new Date(election.endTime).toLocaleString()}</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-xs text-slate-600 font-semibold mb-1">Candidates</p>
                      <p className="text-sm text-slate-900 font-bold">{election.candidates.length} candidates</p>
                    </div>
                  </div>

                  {/* Candidates Section */}
                  <div className="mb-6 p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="h-5 w-5 text-purple-600" />
                      <h4 className="font-bold text-slate-900">Candidates</h4>
                    </div>
                    {election.candidates.length > 0 ? (
                      <div className="space-y-2 mb-4">
                        {election.candidates.map((candidate) => (
                          <div key={candidate._id} className="px-4 py-3 bg-white rounded-lg border border-slate-200">
                            <p className="text-sm font-bold text-slate-900">{candidate.name}</p>
                            <p className="text-xs text-slate-600 mt-1">Party: {candidate.party}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-600 mb-4 italic">No candidates added yet</p>
                    )}
                    
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                          value={candidateInputs[election._id]?.name || ''}
                          onChange={(event) =>
                            setCandidateInputs((prev) => ({
                              ...prev,
                              [election._id]: { ...prev[election._id], name: event.target.value }
                            }))
                          }
                          placeholder="Candidate name"
                        />
                        <input
                          className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                          value={candidateInputs[election._id]?.party || ''}
                          onChange={(event) =>
                            setCandidateInputs((prev) => ({
                              ...prev,
                              [election._id]: { ...prev[election._id], party: event.target.value }
                            }))
                          }
                          placeholder="Party name"
                        />
                      </div>
                      <button
                        onClick={() => addCandidate(election._id)}
                        className="w-full px-4 py-2 bg-purple-600 text-white text-sm font-bold rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Add Candidate
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid gap-2 md:grid-cols-3">
                    <button
                      onClick={() => updateStatus(election._id, 'Active')}
                      className="px-4 py-3 bg-emerald-50 text-emerald-700 font-bold text-sm rounded-lg border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <TrendingUp className="h-4 w-4" />
                      Activate
                    </button>
                    <button
                      onClick={() => updateStatus(election._id, 'Closed')}
                      className="px-4 py-3 bg-rose-50 text-rose-700 font-bold text-sm rounded-lg border border-rose-200 hover:bg-rose-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <X className="h-4 w-4" />
                      Close
                    </button>
                    <button
                      onClick={() => viewResults(election._id)}
                      className="px-4 py-3 bg-blue-50 text-blue-700 font-bold text-sm rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      View Results
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && elections.length === 0 && (
            <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center">
              <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="mb-2 text-xl font-bold text-slate-900">No Elections Yet</h3>
              <p className="text-slate-600 mb-6">Start by creating your first election</p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                <Plus className="h-5 w-5" />
                Create Election
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default AdminDashboardPage;
