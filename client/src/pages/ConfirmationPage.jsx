import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Copy, Download, Shield, Home } from 'lucide-react';
import { useState } from 'react';

function ConfirmationPage() {
  const location = useLocation();
  const voteHash = location.state?.voteHash;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (voteHash) {
      navigator.clipboard.writeText(voteHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadProof = () => {
    if (voteHash) {
      const element = document.createElement('a');
      const file = new Blob([`Vote Proof Hash:\n${voteHash}\n\nSubmitted on: ${new Date().toLocaleString()}`], {
        type: 'text/plain',
      });
      element.href = URL.createObjectURL(file);
      element.download = `vote-proof-${Date.now()}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 flex items-center justify-center px-4 py-12 sm:px-6 sm:py-24">
      <div className="w-full max-w-2xl">
        {/* Success Animation */}
        <div className="text-center mb-12">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-emerald-100 to-teal-100">
            <CheckCircle className="h-12 w-12 text-emerald-600 animate-bounce" />
          </div>

          <div className="mb-6 flex items-center gap-2 justify-center">
            <span className="inline-block h-3 w-3 rounded-full bg-emerald-500" />
            <span className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Vote Cast Successfully
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-black text-slate-900 sm:text-5xl">
            Your Vote Has Been
            <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Encrypted & Secured
            </span>
          </h1>

          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            Your vote has been submitted successfully and encrypted with AES-256. You can now verify your submission using the proof hash below.
          </p>
        </div>

        {/* Proof Hash Card */}
        <div className="mb-8 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-8">
          <div className="mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-emerald-900">Your Vote Proof Hash</h2>
          </div>

          <p className="text-sm text-emerald-700 mb-4">
            This is your unique, immutable proof of voting. Keep it safe for verification purposes.
          </p>

          {voteHash ? (
            <div className="space-y-4">
              {/* Hash Display */}
              <div className="rounded-lg bg-white p-4 border border-emerald-200">
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest mb-3">SHA-256 Hash</p>
                <p className="break-all font-mono text-sm text-slate-900 font-bold mb-4">{voteHash}</p>

                {/* Copy Feedback */}
                {copied && (
                  <p className="text-xs text-emerald-700 font-semibold">✓ Copied to clipboard</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-emerald-300 text-emerald-700 font-bold text-sm rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  <Copy className="h-4 w-4" />
                  <span className="hidden sm:inline">Copy Hash</span>
                  <span className="sm:hidden">Copy</span>
                </button>
                <button
                  onClick={downloadProof}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white font-bold text-sm rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download</span>
                  <span className="sm:hidden">Save</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-lg bg-white p-6 border border-rose-200 text-center">
              <p className="text-rose-700 font-semibold">Hash unavailable</p>
              <p className="text-sm text-rose-600 mt-1">Your vote may not have completed successfully.</p>
            </div>
          )}
        </div>

        {/* Security Information */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-2xl font-bold text-slate-900 mb-1">AES-256</div>
            <p className="text-xs text-slate-600 font-medium">Military-grade encryption</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-2xl font-bold text-slate-900 mb-1">SHA-256</div>
            <p className="text-xs text-slate-600 font-medium">Cryptographic hash</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-2xl font-bold text-slate-900 mb-1">Zero Trust</div>
            <p className="text-xs text-slate-600 font-medium">Verifiable proof</p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="font-bold text-blue-900 mb-3">What happens next?</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex gap-3">
              <span className="font-bold flex-shrink-0">1.</span>
              <span>Election administrators will decrypt and count votes</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold flex-shrink-0">2.</span>
              <span>Results will be published with full transparency</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold flex-shrink-0">3.</span>
              <span>You can verify your vote using the proof hash</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold flex-shrink-0">4.</span>
              <span>Audit logs will be available for inspection</span>
            </li>
          </ul>
        </div>

        {/* Return Button */}
        <div className="flex flex-col gap-3">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 text-base font-bold text-white rounded-lg hover:shadow-lg transition-all"
          >
            <Home className="h-5 w-5" />
            Return to Dashboard
          </Link>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-200 text-slate-900 text-base font-bold rounded-lg hover:bg-slate-50 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ConfirmationPage;
