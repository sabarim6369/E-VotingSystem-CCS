import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  return (
    <main className="page-wrap">
      <section className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="chip">Authenticated Voter</p>
          <h2 className="text-2xl font-bold text-slate-900">Welcome, {user.name || 'Voter'}</h2>
        </div>
        <button onClick={logout} className="btn-secondary">
          Logout
        </button>
      </section>

      {loading ? <Loader text="Loading elections..." /> : null}
      {error ? <p className="mb-4 text-sm text-rose-600">{error}</p> : null}

      {!loading && !error ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {elections.length ? elections.map((election) => <ElectionCard key={election._id} election={election} />) : <p>No elections found.</p>}
        </section>
      ) : null}
    </main>
  );
}

export default DashboardPage;
