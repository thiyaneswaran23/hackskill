import { useState, useEffect } from "react";
import axios from "axios";
import "./ProgressOutcomes.css";

function ProgressOutcomes() {
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(""); // state for errors

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMsg("No token found. Please log in.");
        setProgressData(null);
        return;
      }

      const res = await axios.get("http://localhost:5000/api/student/progress", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProgressData(res.data);
    } catch (error) {
      console.error("Error fetching progress:", error);

      if (error.response) {
        // Received response from server
        if (error.response.status === 404) {
          setErrorMsg("Student data not found.");
        } else if (error.response.status === 401) {
          setErrorMsg("Unauthorized. Invalid or expired token.");
        } else {
          setErrorMsg(`Server error: ${error.response.statusText}`);
        }
      } else if (error.request) {
        // No response received
        setErrorMsg("Cannot connect to server. Make sure backend is running.");
      } else {
        // Something else happened
        setErrorMsg(error.message);
      }

      setProgressData(null);
    } finally {
      setLoading(false);
    }
  };

  const getReadinessStatus = (score) => {
    if (score >= 80) return { text: "Ready", color: "#10b981" };
    if (score >= 60) return { text: "In Progress", color: "#f59e0b" };
    return { text: "Getting Started", color: "#ef4444" };
  };

  const calculateSkillsCompletion = (skills) => {
    if (!skills || skills.length === 0) return 0;
    const total = skills.reduce((sum, skill) => sum + skill.progress, 0);
    return Math.round(total / skills.length);
  };

  // Loading state
  if (loading) {
    return (
      <div className="progress-page">
        <div className="page-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading your progress...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error / empty state
  if (!progressData) {
    return (
      <div className="progress-page">
        <div className="page-container">
          <div className="page-header">
            <h1 className="page-title">Progress & Outcomes</h1>
            <p className="page-subtitle">
              Track your mentorship journey, skill growth, and career readiness.
            </p>
          </div>
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <p className="empty-text">
              {errorMsg || "No progress data available. Start your mentorship journey to see your progress here."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const readinessStatus = getReadinessStatus(progressData.careerReadinessScore);
  const skillsCompletion = calculateSkillsCompletion(progressData.skillsProgress);

  return (
    <div className="progress-page">
      <div className="page-container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Progress & Outcomes</h1>
          <p className="page-subtitle">
            Track your mentorship journey, skill growth, and career readiness.
          </p>
        </div>

        {/* Progress Overview Cards */}
        <div className="progress-overview">
          <div className="overview-card">
            <div className="card-icon">📈</div>
            <div className="card-content">
              <h3 className="card-title">Skills Completion</h3>
              <p className="card-value">{skillsCompletion}%</p>
            </div>
          </div>

          <div className="overview-card">
            <div className="card-icon">🤝</div>
            <div className="card-content">
              <h3 className="card-title">Mentorship Sessions</h3>
              <p className="card-value">
                {progressData.mentorship?.sessionsCompleted || 0}
              </p>
            </div>
          </div>

          <div className="overview-card">
            <div className="card-icon">🎯</div>
            <div className="card-content">
              <h3 className="card-title">Career Readiness</h3>
              <p className="card-value">{progressData.careerReadinessScore}%</p>
            </div>
          </div>

          <div className="overview-card">
            <div className="card-icon">✅</div>
            <div className="card-content">
              <h3 className="card-title">Placement Status</h3>
              <p
                className="card-value status-value"
                style={{ color: readinessStatus.color }}
              >
                {readinessStatus.text}
              </p>
            </div>
          </div>
        </div>

        {/* Skill Progress Section */}
        <div className="skill-progress-section">
          <h2 className="section-title">Skill Progress</h2>
          <div className="skills-container">
            {progressData.skillsProgress && progressData.skillsProgress.length > 0 ? (
              progressData.skillsProgress.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">{skill.skill}</span>
                    <span className="skill-percentage">{skill.progress}%</span>
                  </div>
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-skills">
                <p>No skills tracked yet. Complete your profile to start tracking.</p>
              </div>
            )}
          </div>
        </div>

        {/* Mentorship Timeline */}
        <div className="mentorship-timeline-section">
          <h2 className="section-title">Mentorship Timeline</h2>
          {progressData.mentorship ? (
            <div className="timeline-container">
              <div className="timeline-item completed">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4 className="timeline-title">Mentor Assigned</h4>
                  <p className="timeline-description">
                    Matched with {progressData.mentorship.mentorName || "your mentor"}
                  </p>
                  <span className="timeline-date">Started</span>
                </div>
              </div>

              <div className={`timeline-item ${progressData.mentorship.sessionsCompleted > 0 ? "completed" : "pending"}`}>
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4 className="timeline-title">Sessions Completed</h4>
                  <p className="timeline-description">
                    {progressData.mentorship.sessionsCompleted} session(s) completed
                  </p>
                  <span className="timeline-date">Ongoing</span>
                </div>
              </div>

              {progressData.mentorship.feedbackReceived && (
                <div className="timeline-item completed">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4 className="timeline-title">Feedback Received</h4>
                    <p className="timeline-description">
                      Received constructive feedback from mentor
                    </p>
                    <span className="timeline-date">Recent</span>
                  </div>
                </div>
              )}

              {progressData.mentorship.nextSession && (
                <div className="timeline-item pending">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4 className="timeline-title">Next Session</h4>
                    <p className="timeline-description">Scheduled mentorship session</p>
                    <span className="timeline-date">
                      {new Date(progressData.mentorship.nextSession).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="empty-timeline">
              <div className="empty-icon">📅</div>
              <p className="empty-text">No mentorship timeline available. Request a mentor to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProgressOutcomes;
