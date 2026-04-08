import { Link, useLocation } from 'react-router-dom';

function ConfirmationPage() {
  const location = useLocation();
  const voteHash = location.state?.voteHash;

  return (
    <main className="page-wrap">
      <section className="card p-6 text-center">
        <h2 className="mb-3 text-2xl font-bold text-emerald-700">Vote Submitted Successfully</h2>
        <p className="mb-5 text-slate-600">Your encrypted vote has been stored. Keep this hash as proof of submission.</p>

        <div className="mb-6 rounded-xl bg-slate-100 p-4 text-left">
          <p className="mb-1 text-xs uppercase tracking-wider text-slate-500">Vote Hash (SHA-256)</p>
          <p className="break-all font-mono text-sm text-slate-800">{voteHash || 'Hash unavailable. Vote may not have completed.'}</p>
        </div>

        <Link className="btn-primary inline-flex" to="/dashboard">
          Return to Dashboard
        </Link>
      </section>
    </main>
  );
}

export default ConfirmationPage;
