import { Link } from 'react-router-dom';

function ElectionCard({ election }) {
  const statusClass = election.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700';

  return (
    <article className="card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">{election.title}</h3>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}>{election.status}</span>
      </div>

      <p className="mb-4 text-sm text-slate-600">{election.description}</p>

      <div className="mb-4 space-y-1 text-xs text-slate-500">
        <p>Starts: {new Date(election.startTime).toLocaleString()}</p>
        <p>Ends: {new Date(election.endTime).toLocaleString()}</p>
      </div>

      {election.canVote ? (
        <Link to={`/vote/${election._id}`} className="btn-primary inline-flex">
          Vote Now
        </Link>
      ) : (
        <button className="btn-muted" disabled>
          {election.hasVoted ? 'Already Voted' : 'Voting Unavailable'}
        </button>
      )}
    </article>
  );
}

export default ElectionCard;
