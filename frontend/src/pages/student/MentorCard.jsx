import './AIMentorMatch.css';

function MentorCard({ mentor, onRequestMentorship, onViewProfile, isRequesting }) {
  const getMatchColor = (score) => {
    if (score >= 85) return '#10b981'; // Green
    if (score >= 70) return '#667eea'; // Purple
    return '#f59e0b'; // Orange
  };

  return (
    <div className="mentor-card">
      <div className="mentor-card-header">
        <div className="mentor-match-score" style={{ backgroundColor: `${getMatchColor(mentor.matchScore)}15`, color: getMatchColor(mentor.matchScore) }}>
          {mentor.matchScore}% Match
        </div>
      </div>
      
      <div className="mentor-card-body">
        <h3 className="mentor-name">{mentor.fullName}</h3>
        <p className="mentor-job-title">{mentor.jobTitle}</p>
        <p className="mentor-company">{mentor.company}</p>
        <p className="mentor-experience">{mentor.experience} years of experience</p>
        
        <div className="mentor-areas">
          {mentor.mentorshipAreas?.map((area, index) => (
            <span key={index} className="mentor-tag">{area}</span>
          ))}
        </div>
        
        <div className="mentor-reason">
          <p className="reason-text">
            <strong>Why recommended:</strong> {mentor.matchReason}
          </p>
        </div>
      </div>
      
      <div className="mentor-card-actions">
        <button
          className="btn-primary"
          onClick={onRequestMentorship}
          disabled={isRequesting}
        >
          {isRequesting ? 'Sending...' : 'Request Mentorship'}
        </button>
        <button
          className="btn-secondary"
          onClick={onViewProfile}
        >
          View Profile
        </button>
      </div>
    </div>
  );
}

export default MentorCard;
