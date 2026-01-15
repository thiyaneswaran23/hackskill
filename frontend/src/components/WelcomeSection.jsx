import './WelcomeSection.css';

function WelcomeSection({ userName, role }) {
  const getSubtitle = (role) => {
    const subtitles = {
      student: 'Your AI-driven mentorship journey continues. Connect with alumni mentors, track your skill development, and achieve real placement outcomes.',
      alumni: 'Make a meaningful impact by mentoring students. Share your expertise, guide career paths, and help shape the next generation of professionals.',
      admin: 'Oversee platform operations, monitor engagement metrics, and ensure optimal AI matching for successful mentorship outcomes across the platform.'
    };
    return subtitles[role?.toLowerCase()] || subtitles.student;
  };

  return (
    <section className="welcome-section">
      <div className="welcome-container">
        <h1 className="welcome-title">
          Welcome back, {userName || 'there'}
        </h1>
        <p className="welcome-subtitle">
          {getSubtitle(role)}
        </p>
      </div>
    </section>
  );
}

export default WelcomeSection;
