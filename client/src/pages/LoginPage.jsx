import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Shield } from 'lucide-react';
import { authApi } from '../services/api';

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ aadhaarId: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await authApi.login(form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <nav className="border-b border-slate-200/50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between sm:px-6">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Shield className="h-6 w-6 text-slate-900" />
            <span className="text-lg font-bold text-slate-900">SecureVote</span>
          </Link>
          <div className="flex items-center gap-4">
            <p className="text-sm text-slate-600">New voter?</p>
            <Link 
              to="/register" 
              className="px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-4 py-12 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left Side - Info */}
            <div>
              <div className="mb-6 flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-blue-500" />
                <span className="text-sm font-semibold uppercase tracking-wider text-blue-700">
                  Voter Login
                </span>
              </div>

              <h1 className="mb-4 text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
                Access Your
                <span className="block bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  Secure Voting
                </span>
              </h1>

              <p className="mb-8 text-lg text-slate-600 leading-relaxed">
                Sign in to your SecureVote account to participate in secure, encrypted elections. Your vote is your power.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Military-Grade Security</p>
                    <p className="text-sm text-slate-600">Your credentials are encrypted end-to-end</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                      <Lock className="h-5 w-5 text-emerald-600" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">JWT Token Authentication</p>
                    <p className="text-sm text-slate-600">Secure session management with token expiry</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-blue-200 via-emerald-200 to-teal-200 blur-2xl opacity-40" />
              <div className="rounded-2xl bg-white p-8 shadow-xl border border-slate-100">
                <h2 className="mb-2 text-2xl font-bold text-slate-900">Welcome Back</h2>
                <p className="mb-6 text-sm text-slate-600">Enter your credentials to continue</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Aadhaar ID Input */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Aadhaar-like ID
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                        name="aadhaarId"
                        value={form.aadhaarId}
                        onChange={handleChange}
                        placeholder="Enter 12-digit ID"
                        maxLength={12}
                        required
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Exactly 12 digits</p>
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg">
                      <p className="text-sm font-medium text-rose-800">{error}</p>
                    </div>
                  )}

                  {/* Login Button */}
                  <button
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 gap-2 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed py-3 px-4 text-base font-bold text-white rounded-lg transition-all flex items-center justify-center"
                    type="submit"
                  >
                    {loading ? (
                      <>
                        <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Login
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Signup Link */}
                <p className="mt-6 text-center text-sm text-slate-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                    Register now
                  </Link>
                </p>

                {/* Features */}
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <p className="text-xs text-slate-500 text-center mb-3">Protected by</p>
                  <div className="flex justify-center gap-3 text-xs text-slate-600">
                    <span>AES-256</span>
                    <span>•</span>
                    <span>bcrypt</span>
                    <span>•</span>
                    <span>JWT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
