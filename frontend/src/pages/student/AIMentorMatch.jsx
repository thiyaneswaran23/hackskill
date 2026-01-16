import { useState, useEffect } from 'react';
import axios from 'axios';
import './AIMentorMatch.css';
import MentorCard from './MentorCard';
import MentorProfileModal from './MentorProfileModal';

function AIMentorMatch() {
  const [profile, setProfile] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [requesting, setRequesting] = useState({});

  useEffect(() => {
    fetchProfile();
    fetchRecommendations();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/profile/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProfile(res.data.profile);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  /**
   * AI Matching Logic (Backend Implementation Concept):
   * 
   * The backend API /api/mentor-match/recommendations implements an AI-driven matching algorithm
   * that scores mentors based on multiple factors:
   * 
   * 1. Skill Overlap (40% weight):
   *    - Compare student's skills with mentor's expertise areas
   *    - Calculate Jaccard similarity or cosine similarity
   *    - Higher overlap = higher score
   * 
   * 2. Domain Similarity (30% weight):
   *    - Match student's target industry/domain with mentor's current domain
   *    - Use semantic similarity (e.g., NLP embeddings) for fuzzy matching
   *    - Exact match = 100%, related domains = 70-90%
   * 
   * 3. Career Goal Alignment (20% weight):
   *    - Match student's career goal with mentor's job title/role
   *    - Consider career progression path similarity
   *    - Mentor who achieved similar goal = higher score
   * 
   * 4. Mentor Availability (10% weight):
   *    - Factor in mentor's available hours per week
   *    - Prioritize mentors with higher availability
   *    - Consider current mentee load
   * 
   * Final Score Calculation:
   * matchScore = (skillScore * 0.4) + (domainScore * 0.3) + 
   *             (careerGoalScore * 0.2) + (availabilityScore * 0.1)
   * 
   * Mentors are sorted by matchScore (descending) and top matches are returned.
   * Each mentor includes a generated matchReason explaining why they were recommended.
   */
  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/mentor-match/recommendations', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMentors(res.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      // For demo purposes, use mock data if API fails
      setMentors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestMentorship = async (mentorId) => {
    try {
      setRequesting(prev => ({ ...prev, [mentorId]: true }));
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/mentorship/request',
        { mentorId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      alert('Mentorship request sent successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to send mentorship request');
    } finally {
      setRequesting(prev => ({ ...prev, [mentorId]: false }));
    }
  };

  const handleViewProfile = (mentor) => {
    setSelectedMentor(mentor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMentor(null);
  };

  return (
    <div className="ai-mentor-match-page">
      <div className="page-container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">AI Mentor Match</h1>
          <p className="page-subtitle">
            Personalized mentor recommendations based on your skills, domain, and career goals.
          </p>
        </div>

        {/* Student Profile Summary Card */}
        {profile && (
          <div className="profile-summary-card">
            <h2 className="summary-title">Your Profile Summary</h2>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Skills</span>
                <span className="summary-value">
                  {Array.isArray(profile.skills) 
                    ? profile.skills.join(', ') 
                    : profile.skills || 'Not specified'}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Domain</span>
                <span className="summary-value">{profile.domain || 'Not specified'}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Career Goal</span>
                <span className="summary-value">{profile.careerGoal || 'Not specified'}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Current Year</span>
                <span className="summary-value">{profile.currentYear || 'Not specified'}</span>
              </div>
            </div>
          </div>
        )}

        {/* AI Recommended Mentors Section */}
        <div className="mentors-section">
          <h2 className="section-title">AI Recommended Mentors</h2>
          
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Finding your perfect mentors...</p>
            </div>
          ) : mentors.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <p className="empty-text">No mentors found. Complete your profile to get better recommendations.</p>
            </div>
          ) : (
            <div className="mentors-grid">
              {mentors.map((mentor) => (
                <MentorCard
                  key={mentor._id}
                  mentor={mentor}
                  onRequestMentorship={() => handleRequestMentorship(mentor._id)}
                  onViewProfile={() => handleViewProfile(mentor)}
                  isRequesting={requesting[mentor._id] || false}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mentor Profile Modal */}
      {showModal && selectedMentor && (
        <MentorProfileModal
          mentor={selectedMentor}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default AIMentorMatch;
