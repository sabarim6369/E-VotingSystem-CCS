import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import { adminApi } from '../../services/api';

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [newElection, setNewElection] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: ''
  });
  const [candidateInputs, setCandidateInputs] = useState({});

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
      setMessage('Election created');
      setNewElection({ title: '', description: '', startTime: '', endTime: '' });
      loadElections();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create election');
    }
  };

  const addCandidate = async (electionId) => {
    const name = candidateInputs[electionId];
    if (!name) return;

    setMessage('');
    setError('');

    try {
      await adminApi.addCandidate(electionId, { name });
      setMessage('Candidate added');
      setCandidateInputs((prev) => ({ ...prev, [electionId]: '' }));
      loadElections();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not add candidate');
    }
  };

  const updateStatus = async (electionId, status) => {
    setMessage('');
    setError('');

    try {
      await adminApi.setStatus(electionId, { status });
      setMessage(`Election marked ${status}`);
      loadElections();
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
    <main className="page-wrap space-y-8">
      <section className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-slate-900">Admin Dashboard</h2>
        <button className="btn-secondary" onClick={logout}>
          Logout
        </button>
      </section>

      <section className="card p-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-800">Create Election</h3>
        <form className="grid gap-3 md:grid-cols-2" onSubmit={createElection}>
          <input className="input" placeholder="Election title" value={newElection.title} onChange={(event) => setNewElection((prev) => ({ ...prev, title: event.target.value }))} required />
          <input className="input" placeholder="Description" value={newElection.description} onChange={(event) => setNewElection((prev) => ({ ...prev, description: event.target.value }))} required />
          <input className="input" type="datetime-local" value={newElection.startTime} onChange={(event) => setNewElection((prev) => ({ ...prev, startTime: event.target.value }))} required />
          <input className="input" type="datetime-local" value={newElection.endTime} onChange={(event) => setNewElection((prev) => ({ ...prev, endTime: event.target.value }))} required />
          <button className="btn-primary md:col-span-2" type="submit">
            Create Election
          </button>
        </form>
      </section>

      {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}

      {loading ? <Loader text="Loading admin elections..." /> : null}

      {!loading ? (
        <section className="space-y-4">
          {elections.map((election) => (
            <article className="card p-5" key={election._id}>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{election.title}</h3>
                  <p className="text-sm text-slate-600">{election.description}</p>
                </div>
                <span className="chip">{election.status}</span>
              </div>

              <div className="mb-3 flex flex-wrap gap-2">
                <button className="btn-primary" onClick={() => updateStatus(election._id, 'Active')}>
                  Activate
                </button>
                <button className="btn-secondary" onClick={() => updateStatus(election._id, 'Closed')}>
                  Close
                </button>
                <button className="btn-secondary" onClick={() => viewResults(election._id)}>
                  View Results
                </button>
              </div>

              <div className="mb-3 text-sm text-slate-600">
                Candidates: {election.candidates.map((candidate) => candidate.name).join(', ') || 'None yet'}
              </div>

              <div className="flex flex-wrap gap-2">
                <input
                  className="input max-w-sm"
                  value={candidateInputs[election._id] || ''}
                  onChange={(event) =>
                    setCandidateInputs((prev) => ({ ...prev, [election._id]: event.target.value }))
                  }
                  placeholder="Candidate name"
                />
                <button className="btn-primary" onClick={() => addCandidate(election._id)}>
                  Add Candidate
                </button>
              </div>
            </article>
          ))}
        </section>
      ) : null}
    </main>
  );
}

export default AdminDashboardPage;
