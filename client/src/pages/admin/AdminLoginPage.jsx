import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <main className="page-wrap">
      <section className="form-card">
        <h2 className="form-title">Admin Access</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input className="input" name="email" value={form.email} onChange={handleChange} placeholder="Admin email" required />
          <input
            className="input"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Admin password"
            required
          />
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Signing in...' : 'Login as Admin'}
          </button>
        </form>
      </section>
    </main>
  );
}

export default AdminLoginPage;
