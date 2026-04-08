import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Shield, KeyRound } from 'lucide-react';
import { authApi } from '../../services/api';

function AdminLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
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
      const { data } = await authApi.adminLogin(form);
      localStorage.setItem('adminToken', data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Admin login failed');
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
            <p className="text-sm text-slate-600">Admin Only</p>
            <Link 
              to="/login" 
              className="px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Voter Login
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
                <span className="inline-block h-3 w-3 rounded-full bg-purple-500" />
                <span className="text-sm font-semibold uppercase tracking-wider text-purple-700">
                  Admin Access
                </span>
              </div>

              <h1 className="mb-4 text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
                Manage
                <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Secure Elections
                </span>
              </h1>

              <p className="mb-8 text-lg text-slate-600 leading-relaxed">
                Access the admin panel to create elections, manage candidates, and decrypt voting results with audit logs.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                      <KeyRound className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Secure Authentication</p>
                    <p className="text-sm text-slate-600">Email + password with JWT protection</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100">
                      <Shield className="h-5 w-5 text-pink-600" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Full Transaction Audit</p>
                    <p className="text-sm text-slate-600">Track all decryption and result modifications</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-purple-200 via-pink-200 to-rose-200 blur-2xl opacity-40" />
              <div className="rounded-2xl bg-white p-8 shadow-xl border border-slate-100">
                <h2 className="mb-2 text-2xl font-bold text-slate-900">Admin Login</h2>
                <p className="mb-6 text-sm text-slate-600">Enter your admin credentials to continue</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Admin Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 placeholder-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter admin email"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Admin Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 placeholder-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
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
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 gap-2 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed py-3 px-4 text-base font-bold text-white rounded-lg transition-all flex items-center justify-center"
                    type="submit"
                  >
                    {loading ? (
                      <>
                        <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Admin Login
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Admin Only Notice */}
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <p className="text-xs text-slate-500 text-center mb-2">🔐 ADMIN ONLY</p>
                  <p className="text-xs text-slate-600 text-center">
                    Unauthorized access attempts are logged and audited
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminLoginPage;
