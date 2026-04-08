import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <main className="page-wrap">
      <section className="hero-shell">
        <p className="chip">Cyber Integrity Ready</p>
        <h1 className="hero-title">Secure Online Voting System</h1>
        <p className="hero-subtitle">
          Cast encrypted votes with verifiable proof hashes. Transparent, time-bound, and secure by design.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/login" className="btn-primary">
            Login
          </Link>
          <Link to="/register" className="btn-secondary">
            Register
          </Link>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
