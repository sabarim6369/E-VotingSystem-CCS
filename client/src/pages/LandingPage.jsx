import { Link } from 'react-router-dom';
import { Shield, Lock, CheckCircle, Zap, Eye, TrendingUp } from 'lucide-react';

function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between sm:px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-slate-900" />
            <span className="text-lg font-bold text-slate-900">SecureVote</span>
          </div>
          <div className="flex gap-2 md:gap-3">
            <Link to="/login" className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900">
              Voter Login
            </Link>
            <Link to="/admin" className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900">
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-50 via-transparent to-emerald-50" />
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <div className="mb-6 flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                  Election Infrastructure
                </span>
              </div>

              <h1 className="mb-4 text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
                Democracy Meets
                <span className="block bg-gradient-to-r from-blue-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Cryptography
                </span>
              </h1>

              <p className="mb-6 text-lg text-slate-600">
                Cast encrypted votes with cryptographic proof. Every vote is secured with AES-256 encryption, SHA-256 hashing, and time-bound verification. No single authority controls your vote.
              </p>

              <div className="mb-8 flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 bg-slate-900 px-6 py-3 text-sm font-bold text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Start Voting
                  <Zap className="h-4 w-4" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 border-2 border-slate-900 px-6 py-3 text-sm font-bold text-slate-900 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Existing Voter
                </Link>
              </div>

              <div className="flex gap-8 text-sm text-slate-700">
                <div>
                  <p className="font-bold text-slate-900">100%</p>
                  <p>Encrypted</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900">Zero</p>
                  <p>Trust Needed</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900">Real-time</p>
                  <p>Verification</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-blue-200 via-emerald-200 to-teal-200 blur-3xl opacity-50" />
              <div className="rounded-2xl bg-white p-8 shadow-xl border border-slate-100">
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <div className="rounded-lg bg-blue-50 p-4 text-center">
                    <Lock className="mx-auto mb-2 h-5 w-5 text-blue-600" />
                    <p className="text-xs font-semibold text-blue-900">AES-256</p>
                  </div>
                  <div className="rounded-lg bg-emerald-50 p-4 text-center">
                    <Shield className="mx-auto mb-2 h-5 w-5 text-emerald-600" />
                    <p className="text-xs font-semibold text-emerald-900">JWT Auth</p>
                  </div>
                  <div className="rounded-lg bg-teal-50 p-4 text-center">
                    <CheckCircle className="mx-auto mb-2 h-5 w-5 text-teal-600" />
                    <p className="text-xs font-semibold text-teal-900">SHA-256</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Military-grade encryption protects every vote. Get a unique proof hash after voting. Immutable, transparent, and auditable by design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-black text-slate-900 sm:text-4xl">
              Why SecureVote?
            </h2>
            <p className="text-lg text-slate-600">Built with security, transparency, and accessibility in mind</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="mb-4 inline-flex rounded-lg bg-blue-100 p-3">
                <Lock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">End-to-End Encryption</h3>
              <p className="text-sm text-slate-600">
                Your vote is encrypted immediately using AES-256. Only authorized admins can decrypt results for counting.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="mb-4 inline-flex rounded-lg bg-emerald-100 p-3">
                <Shield className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">Double Voting Prevention</h3>
              <p className="text-sm text-slate-600">
                Advanced duplicate detection ensures each voter casts only one vote per election using time-window verification.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="mb-4 inline-flex rounded-lg bg-teal-100 p-3">
                <Eye className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">Proof of Vote</h3>
              <p className="text-sm text-slate-600">
                Receive a SHA-256 hash after voting as immutable proof. Track and verify your vote's integrity anytime.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="mb-4 inline-flex rounded-lg bg-amber-100 p-3">
                <CheckCircle className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">Real-Time Results</h3>
              <p className="text-sm text-slate-600">
                Admin dashboard decrypts and tallies votes live. Transparent counting with audit logs for every action.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="mb-4 inline-flex rounded-lg bg-purple-100 p-3">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">Time-Bound Elections</h3>
              <p className="text-sm text-slate-600">
                Elections have strict start and end times. Votes outside the window are rejected automatically.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="mb-4 inline-flex rounded-lg bg-pink-100 p-3">
                <Zap className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">JWT Authentication</h3>
              <p className="text-sm text-slate-600">
                Token-based auth prevents unauthorized access. Sessions expire automatically for maximum security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-4 py-16 text-white sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-black sm:text-4xl">How SecureVote Works</h2>
            <p className="text-lg text-slate-300">Four simple steps to cast your vote securely</p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {/* Step 1 */}
            <div className="text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-lg font-bold mx-auto">
                1
              </div>
              <h3 className="mb-2 font-bold">Register or Login</h3>
              <p className="text-sm text-slate-300">Create account with your Aadhaar-like ID and secure password</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-lg font-bold mx-auto">
                2
              </div>
              <h3 className="mb-2 font-bold">Browse Elections</h3>
              <p className="text-sm text-slate-300">View all active and upcoming elections with candidate lists</p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-500 text-lg font-bold mx-auto">
                3
              </div>
              <h3 className="mb-2 font-bold">Cast Vote</h3>
              <p className="text-sm text-slate-300">Select candidate and submit. Vote encrypted before storage</p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 text-lg font-bold mx-auto">
                4
              </div>
              <h3 className="mb-2 font-bold">Get Proof Hash</h3>
              <p className="text-sm text-slate-300">Receive SHA-256 hash as permanent proof of your vote</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Highlights */}
      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-black text-slate-900 sm:text-4xl">
              Security at Every Layer
            </h2>
            <p className="text-lg text-slate-600">Enterprise-grade infrastructure protecting your democratic rights</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-8">
              <h3 className="mb-4 text-xl font-bold text-blue-900">Frontend Protection</h3>
              <ul className="space-y-3 text-sm text-blue-800">
                <li className="flex gap-2">
                  <span className="font-bold">→</span>
                  <span>Protected routes with JWT token validation</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">→</span>
                  <span>Automatic logout on token expiry</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">→</span>
                  <span>CSRF protection via same-site cookies</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-8">
              <h3 className="mb-4 text-xl font-bold text-emerald-900">Backend Protection</h3>
              <ul className="space-y-3 text-sm text-emerald-800">
                <li className="flex gap-2">
                  <span className="font-bold">→</span>
                  <span>bcrypt password hashing (12 rounds)</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">→</span>
                  <span>CORS and Helmet middleware active</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">→</span>
                  <span>MongoDB unique indexes prevent duplicates</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border-2 border-teal-200 bg-teal-50 p-8">
              <h3 className="mb-4 text-xl font-bold text-teal-900">Vote Protection</h3>
              <ul className="space-y-3 text-sm text-teal-800">
                <li className="flex gap-2">
                  <span className="font-bold">→</span>
                  <span>AES-256-CBC encryption for every vote</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">→</span>
                  <span>Random IV for each encryption</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">→</span>
                  <span>SHA-256 hash verification included</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border-2 border-purple-200 bg-purple-50 p-8">
              <h3 className="mb-4 text-xl font-bold text-purple-900">Admin Panel</h3>
              <ul className="space-y-3 text-sm text-purple-800">
                <li className="flex gap-2">
                  <span className="font-bold">→</span>
                  <span>Separate admin authentication layer</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">→</span>
                  <span>Audit logs for all vote decryption</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">→</span>
                  <span>Role-based access control (RBAC)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 via-emerald-600 to-teal-600 px-4 py-16 text-white sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-4 text-center">
            <div>
              <p className="text-4xl font-black">256-bit</p>
              <p className="text-sm text-blue-100">Encryption Standard</p>
            </div>
            <div>
              <p className="text-4xl font-black">12-round</p>
              <p className="text-sm text-blue-100">Password Hashing</p>
            </div>
            <div>
              <p className="text-4xl font-black">JWT</p>
              <p className="text-sm text-blue-100">Token Auth</p>
            </div>
            <div>
              <p className="text-4xl font-black">Zero</p>
              <p className="text-sm text-blue-100">Trust Required</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-black text-slate-900 sm:text-4xl">
            Ready to Vote Securely?
          </h2>
          <p className="mb-8 text-lg text-slate-600">
            Join thousands of voters using cryptographically verified elections. Your vote matters, and your privacy is guaranteed.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-slate-900 px-8 py-4 text-base font-bold text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Create Account Now
            </Link>
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 border-2 border-slate-900 px-8 py-4 text-base font-bold text-slate-900 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 px-4 py-12 text-center text-sm text-slate-600 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4">
            SecureVote © 2026 • Your vote is your right. Your privacy is our duty.
          </p>
          <div className="flex justify-center gap-6 text-xs font-semibold text-slate-500">
            <span>Military-Grade Encryption</span>
            <span>•</span>
            <span>Zero-Trust Architecture</span>
            <span>•</span>
            <span>Transparent Results</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default LandingPage;
