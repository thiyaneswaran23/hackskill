import './AIMentorMatch.css';

function MentorProfileModal({ mentor, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Mentor Profile</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="modal-profile-section">
            <h3 className="modal-section-title">Personal Information</h3>
            <div className="modal-info-grid">
              <div className="modal-info-item">
                <span className="modal-info-label">Full Name</span>
                <span className="modal-info-value">{mentor.fullName}</span>
              </div>
              <div className="modal-info-item">
                <span className="modal-info-label">Job Title</span>
                <span className="modal-info-value">{mentor.jobTitle}</span>
              </div>
              <div className="modal-info-item">
                <span className="modal-info-label">Company</span>
                <span className="modal-info-value">{mentor.company}</span>
              </div>
              <div className="modal-info-item">
                <span className="modal-info-label">Experience</span>
                <span className="modal-info-value">{mentor.experience} years</span>
              </div>
            </div>
          </div>

          {mentor.mentorshipAreas && mentor.mentorshipAreas.length > 0 && (
            <div className="modal-profile-section">
              <h3 className="modal-section-title">Mentorship Areas</h3>
              <div className="modal-tags">
                {mentor.mentorshipAreas.map((area, index) => (
                  <span key={index} className="modal-tag">{area}</span>
                ))}
              </div>
            </div>
          )}

          {mentor.bio && (
            <div className="modal-profile-section">
              <h3 className="modal-section-title">About</h3>
              <p className="modal-bio">{mentor.bio}</p>
            </div>
          )}

          {mentor.availability && (
            <div className="modal-profile-section">
              <h3 className="modal-section-title">Availability</h3>
              <p className="modal-availability">{mentor.availability} hours/week</p>
            </div>
          )}

          {mentor.matchReason && (
            <div className="modal-profile-section">
              <h3 className="modal-section-title">Why This Mentor?</h3>
              <p className="modal-reason">{mentor.matchReason}</p>
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default MentorProfileModal;
