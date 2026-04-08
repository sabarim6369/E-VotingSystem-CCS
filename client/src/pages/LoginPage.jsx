import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    <main className="page-wrap">
      <section className="form-card">
        <h2 className="form-title">Voter Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="input"
            name="aadhaarId"
            value={form.aadhaarId}
            onChange={handleChange}
            placeholder="12-digit Aadhaar-like ID"
            maxLength={12}
            required
          />
          <input
            className="input"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          <button disabled={loading} className="btn-primary w-full" type="submit">
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          No account? <Link to="/register" className="text-slate-900 underline">Register</Link>
        </p>
      </section>
    </main>
  );
}

export default LoginPage;
