import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    <main className="page-wrap">
      <section className="form-card">
        <h2 className="form-title">Create Voter Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="input" name="name" value={form.name} onChange={handleChange} placeholder="Full name" required />
          <input
            className="input"
            name="aadhaarId"
            value={form.aadhaarId}
            onChange={handleChange}
            maxLength={12}
            placeholder="12-digit Aadhaar-like ID"
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
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          Already registered? <Link to="/login" className="text-slate-900 underline">Login</Link>
        </p>
      </section>
    </main>
  );
}

export default RegisterPage;
