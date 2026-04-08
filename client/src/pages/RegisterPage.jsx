import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Mail, ArrowRight, Shield, CheckCircle } from 'lucide-react';
import { authApi } from '../services/api';

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', aadhaarId: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    if (!/^\d{12}$/.test(form.aadhaarId)) {
      setError('Aadhaar-like ID must be exactly 12 digits');
      setLoading(false);
      return;
    }

    try {
      const { data } = await authApi.register(form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
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
            <p className="text-sm text-slate-600">Already registered?</p>
            <Link 
              to="/login" 
              className="px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Sign In
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
                <span className="inline-block h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                  Create Account
                </span>
              </div>

              <h1 className="mb-4 text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
                Join Secure
                <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Elections Today
                </span>
              </h1>

              <p className="mb-8 text-lg text-slate-600 leading-relaxed">
                Create your SecureVote account to participate in cryptographically verified elections. It takes just a minute.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Quick & Easy Setup</p>
                    <p className="text-sm text-slate-600">Just 3 steps to verify your identity</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                      <Shield className="h-5 w-5 text-teal-600" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Your Privacy Matters</p>
                    <p className="text-sm text-slate-600">Data encrypted at rest with AES-256</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                      <Lock className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Verified Identity</p>
                    <p className="text-sm text-slate-600">Aadhaar-like ID validation included</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-emerald-200 via-teal-200 to-blue-200 blur-2xl opacity-40" />
              <div className="rounded-2xl bg-white p-8 shadow-xl border border-slate-100">
                <h2 className="mb-2 text-2xl font-bold text-slate-900">Create Account</h2>
                <p className="mb-6 text-sm text-slate-600">Start voting securely right now</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name Input */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>

                  {/* Aadhaar ID Input */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Aadhaar-like ID
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all"
                        name="aadhaarId"
                        value={form.aadhaarId}
                        onChange={handleChange}
                        maxLength={12}
                        placeholder="Enter 12-digit ID"
                        required
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Used for voter verification</p>
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Create a strong password"
                        required
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Minimum 8 characters recommended</p>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg">
                      <p className="text-sm font-medium text-rose-800">{error}</p>
                    </div>
                  )}

                  {/* Register Button */}
                  <button
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 gap-2 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed py-3 px-4 text-base font-bold text-white rounded-lg transition-all flex items-center justify-center"
                    type="submit"
                  >
                    {loading ? (
                      <>
                        <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Login Link */}
                <p className="mt-6 text-center text-sm text-slate-600">
                  Already have an account?{' '}
                  <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                    Sign in
                  </Link>
                </p>

                {/* Security Info */}
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <p className="text-xs text-slate-500 text-center mb-3">Your data is protected by</p>
                  <div className="flex justify-center gap-3 text-xs text-slate-600">
                    <span>AES-256</span>
                    <span>•</span>
                    <span>bcrypt</span>
                    <span>•</span>
                    <span>HTTPS</span>
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

export default RegisterPage;
