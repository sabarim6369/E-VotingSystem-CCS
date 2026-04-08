import { Link } from 'react-router-dom';
import { Shield, Lock, CheckCircle, Zap, Eye, TrendingUp } from 'lucide-react';

function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-indigo-100 bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 shadow-lg backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-white/20">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-black text-white tracking-tight">SecureVote</span>
          </div>
          <div className="flex gap-2 md:gap-4">
            <Link to="/login" className="px-4 py-2 text-sm font-semibold text-white hover:bg-white/15 rounded-lg transition-all duration-200">
              Voter Login
            </Link>
            <Link to="/admin" className="px-4 py-2 text-sm font-semibold text-indigo-600 bg-white hover:bg-gray-50 rounded-lg transition-all duration-200 font-bold">
              Admin Access
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-200 opacity-20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-indigo-200 opacity-20 blur-3xl" />
        </div>
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="mb-8 flex items-center gap-3">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600" />
                <span className="text-sm font-extrabold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Next-Gen Voting
                </span>
              </div>

              <h1 className="mb-6 text-5xl font-black leading-tight text-gray-900 sm:text-6xl lg:text-5xl">
                Democracy Meets
                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mt-2">
                  Cryptography
                </span>
              </h1>

              <p className="mb-8 text-lg leading-relaxed text-gray-700">
                Cast encrypted votes with cryptographic proof. Every vote is secured with <span className="font-bold">AES-256 encryption</span>, <span className="font-bold">SHA-256 hashing</span>, and <span className="font-bold">time-bound verification</span>. No single authority controls your vote.
              </p>

              <div className="mb-12 flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-4 text-base font-bold text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 shadow-md"
                >
                  Start Voting
                  <Zap className="h-4 w-4" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 border-2 border-indigo-600 px-7 py-4 text-base font-bold text-indigo-600 rounded-xl hover:bg-indigo-50 transition-all duration-200"
                >
                  Existing Voter
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-white/60 backdrop-blur p-4 border border-blue-100">
                  <p className="font-black text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">100%</p>
                  <p className="text-sm font-medium text-gray-700">Encrypted</p>
                </div>
                <div className="rounded-lg bg-white/60 backdrop-blur p-4 border border-indigo-100">
                  <p className="font-black text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Zero</p>
                  <p className="text-sm font-medium text-gray-700">Trust Needed</p>
                </div>
                <div className="rounded-lg bg-white/60 backdrop-blur p-4 border border-purple-100">
                  <p className="font-black text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Real-time</p>
                  <p className="text-sm font-medium text-gray-700">Verified</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-blue-300 via-indigo-300 to-purple-300 blur-2xl opacity-30" />
              <div className="rounded-3xl bg-white p-10 shadow-2xl border-2 border-white">
                <div className="mb-8 grid grid-cols-3 gap-4">
                  <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-5 text-center border-2 border-blue-200">
                    <Lock className="mx-auto mb-3 h-6 w-6 text-blue-600" />
                    <p className="text-xs font-black text-blue-900">AES-256</p>
                    <p className="text-xs text-blue-700 mt-1">Encryption</p>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 p-5 text-center border-2 border-indigo-200">
                    <Shield className="mx-auto mb-3 h-6 w-6 text-indigo-600" />
                    <p className="text-xs font-black text-indigo-900">JWT Auth</p>
                    <p className="text-xs text-indigo-700 mt-1">Tokens</p>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 p-5 text-center border-2 border-purple-200">
                    <CheckCircle className="mx-auto mb-3 h-6 w-6 text-purple-600" />
                    <p className="text-xs font-black text-purple-900">SHA-256</p>
                    <p className="text-xs text-purple-700 mt-1">Hashing</p>
                  </div>
                </div>
                <p className="text-base leading-relaxed text-gray-700 font-medium">
                  <span className="font-black text-gray-900">Military-grade security</span> protects every vote. Get a unique <span className="font-bold">proof hash</span> after voting. Immutable, transparent, and auditable by design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative px-4 py-20 sm:px-6 sm:py-28 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="text-sm font-extrabold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
              Why Choose SecureVote
            </p>
            <h2 className="mb-4 text-4xl lg:text-5xl font-black text-gray-900">
              Enterprise-Grade Security
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">Built with security, transparency, and accessibility in mind</p>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="group rounded-2xl border-2 border-blue-200 bg-white p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="mb-5 inline-flex rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 p-4">
                <Lock className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="mb-3 text-xl font-black text-gray-900">End-to-End Encryption</h3>
              <p className="text-base text-gray-700 leading-relaxed">
                Your vote is encrypted immediately using <span className="font-bold">AES-256</span>. Only authorized admins can decrypt results for counting.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-2xl border-2 border-indigo-200 bg-white p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="mb-5 inline-flex rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 p-4">
                <Shield className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="mb-3 text-xl font-black text-gray-900">Double Voting Prevention</h3>
              <p className="text-base text-gray-700 leading-relaxed">
                Advanced duplicate detection ensures each voter casts only one vote per election using time-window verification.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-2xl border-2 border-purple-200 bg-white p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="mb-5 inline-flex rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 p-4">
                <Eye className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="mb-3 text-xl font-black text-gray-900">Proof of Vote</h3>
              <p className="text-base text-gray-700 leading-relaxed">
                Receive a <span className="font-bold">SHA-256 hash</span> after voting as immutable proof. Track and verify your vote's integrity anytime.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group rounded-2xl border-2 border-pink-200 bg-white p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="mb-5 inline-flex rounded-xl bg-gradient-to-br from-pink-100 to-pink-200 p-4">
                <CheckCircle className="h-7 w-7 text-pink-600" />
              </div>
              <h3 className="mb-3 text-xl font-black text-gray-900">Real-Time Results</h3>
              <p className="text-base text-gray-700 leading-relaxed">
                Admin dashboard decrypts and tallies votes live. Transparent counting with audit logs for every action.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group rounded-2xl border-2 border-emerald-200 bg-white p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="mb-5 inline-flex rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 p-4">
                <TrendingUp className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="mb-3 text-xl font-black text-gray-900">Time-Bound Elections</h3>
              <p className="text-base text-gray-700 leading-relaxed">
                Elections have strict start and end times. Votes outside the window are rejected automatically.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group rounded-2xl border-2 border-cyan-200 bg-white p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="mb-5 inline-flex rounded-xl bg-gradient-to-br from-cyan-100 to-cyan-200 p-4">
                <Zap className="h-7 w-7 text-cyan-600" />
              </div>
              <h3 className="mb-3 text-xl font-black text-gray-900">JWT Authentication</h3>
              <p className="text-base text-gray-700 leading-relaxed">
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
