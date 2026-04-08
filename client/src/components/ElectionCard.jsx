import { Link } from 'react-router-dom';
import { CheckCircle, Clock, Vote, Lock, ChevronRight } from 'lucide-react';

function ElectionCard({ election }) {
  const now = new Date();
  const startTime = new Date(election.startTime);
  const endTime = new Date(election.endTime);
  
  let status = 'Inactive';
  let statusBg = 'bg-slate-100';
  let statusText = 'text-slate-700';
  let statusIcon = null;

  if (startTime <= now && endTime >= now) {
    status = 'Active';
    statusBg = 'bg-emerald-100';
    statusText = 'text-emerald-700';
    statusIcon = <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />;
  } else if (startTime > now) {
    status = 'Upcoming';
    statusBg = 'bg-blue-100';
    statusText = 'text-blue-700';
    statusIcon = <Clock className="h-4 w-4" />;
  } else if (endTime < now) {
    status = 'Completed';
    statusBg = 'bg-slate-100';
    statusText = 'text-slate-700';
    statusIcon = <CheckCircle className="h-4 w-4" />;
  }

  return (
    <article className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-100 to-emerald-100 flex items-center justify-center">
            <Vote className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {election.title}
            </h3>
            <p className="text-xs text-slate-500">{election.description}</p>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className={`mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${statusBg} ${statusText}`}>
        {statusIcon}
        {status}
      </div>

      {/* Timing Info */}
      <div className="mb-6 grid grid-cols-2 gap-4 text-xs">
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-slate-500 font-semibold mb-1">Starts</p>
          <p className="text-slate-900 font-bold">{startTime.toLocaleDateString()}</p>
          <p className="text-slate-600">{startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-slate-500 font-semibold mb-1">Ends</p>
          <p className="text-slate-900 font-bold">{endTime.toLocaleDateString()}</p>
          <p className="text-slate-600">{endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>

      {/* Security Info */}
      <div className="mb-6 flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 border border-blue-100">
        <Lock className="h-4 w-4 text-blue-600 flex-shrink-0" />
        <span className="text-xs text-blue-700 font-medium">AES-256 Encrypted</span>
      </div>

      {/* Action Button */}
      {election.canVote ? (
        <Link
          to={`/vote/${election._id}`}
          className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 px-4 py-3 text-sm font-bold text-white rounded-lg hover:shadow-lg transition-all group-hover:translate-x-1"
        >
          Vote Now
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <button
          className="w-full px-4 py-3 text-sm font-bold rounded-lg transition-all text-slate-500 bg-slate-100 cursor-not-allowed"
          disabled
        >
          {election.hasVoted ? '✓ Already Voted' : 'Voting Closed'}
        </button>
      )}
    </article>
  );
}

export default ElectionCard;
