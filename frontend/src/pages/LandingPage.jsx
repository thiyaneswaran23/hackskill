import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">AlumniConnect</div>
          <div className="nav-buttons">
            <Link to="/signin">
              <button className="btn-secondary">Sign In</button>
            </Link>
            <Link to="/signup">
              <button className="btn-primary">Sign Up</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-headline">
            AI-Driven Alumni Mentorship for Real Placement Outcomes
          </h1>
          <p className="hero-subheading">
            Connect students with alumni mentors who understand their career path
            and help them bridge the skill gap for successful placements.
          </p>
          <Link to="/signup">
            <button className="btn-cta">Get Started</button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3 className="feature-title">AI Skill Gap Detection</h3>
            <p className="feature-description">
              Our AI analyzes your profile and identifies the exact skills you
              need to develop for your target roles.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3 className="feature-title">Smart Alumni Matching</h3>
            <p className="feature-description">
              Get matched with alumni mentors who have walked your path and
              achieved success in your desired field.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3 className="feature-title">Measurable Mentorship Impact</h3>
            <p className="feature-description">
              Track your progress with data-driven insights and see how
              mentorship translates to real placement outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>
            © 2024 AlumniConnect. Empowering students through meaningful
            connections.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
