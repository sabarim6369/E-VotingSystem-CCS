import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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

  return (
    <main className="page-wrap">
      <section className="mb-4">
        <Link to="/admin/dashboard" className="text-sm text-slate-700 underline">
          Back to Admin Dashboard
        </Link>
      </section>

      {loading ? <Loader text="Decrypting and counting votes..." /> : null}
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}

      {data ? (
        <section className="card p-6">
          <h2 className="mb-1 text-2xl font-bold text-slate-900">{data.election.title}</h2>
          <p className="mb-4 text-slate-600">{data.election.description}</p>
          <p className="mb-6 text-sm text-slate-700">Total Votes: {data.totalVotes}</p>

          <div className="space-y-3">
            {data.results.map((result) => (
              <div key={result.candidateId} className="rounded-xl border border-slate-200 p-3">
                <div className="mb-2 flex items-center justify-between text-sm text-slate-700">
                  <span>{result.name}</span>
                  <span>{result.votes} votes</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full bg-emerald-600"
                    style={{ width: `${data.totalVotes ? (result.votes / data.totalVotes) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

export default AdminResultsPage;
