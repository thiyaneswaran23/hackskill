import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import DashboardHeader from '../components/DashboardHeader';
import WelcomeSection from '../components/WelcomeSection';
import DashboardCard from '../components/DashboardCard';

function Dashboard() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('student');
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  useEffect(() => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        setUserName(user.name || user.email || '');
        setUserRole(user.role?.toLowerCase() || 'student');

        const profileData = localStorage.getItem('profile');
        setIsProfileComplete(!!profileData);
      }
    } catch (error) {
      console.error('Error reading user from localStorage:', error);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/signin';
  };

  /* =========================
     NAVIGATION LOGIC
     ========================= */
  const handleButtonClick = (action) => {
    switch (action) {
      case 'complete-profile':
        navigate('/profile-setup');
        break;

      // Career Resources (Role Based)
      case 'career-resources':
        if (userRole === 'alumni') {
          navigate('/alumni/career-resources');
        } else {
          navigate('/student/career-resources');
        }
        break;

      // Student
      case 'find-mentor':
        navigate('/student/mentor-match');
        break;

      // Alumni
      case 'view-requests':
        navigate('/alumni/requests');
        break;
      case 'view-mentees':
        navigate('/alumni/mentees');
        break;

      // Admin
      case 'manage-users':
        navigate('/admin/users');
        break;
      case 'view-analytics':
        navigate('/admin/analytics');
        break;

      default:
        console.warn(`Unknown action: ${action}`);
    }
  };

  /* =========================
     DASHBOARD CARDS
     ========================= */

  const studentCards = [
    {
      icon: '🤖',
      title: 'AI Mentor Match',
      description:
        'Get AI-powered mentor recommendations aligned with your career goals.',
      buttonText: 'Find Mentor',
      action: 'find-mentor',
    },
    {
      icon: '📚',
      title: 'Career Resources',
      description:
        'Access job openings, internships, interview prep, and learning resources shared by alumni.',
      buttonText: 'Explore Resources',
      action: 'career-resources',
    },
  ];

  const alumniCards = [
    {
      icon: '📚',
      title: 'Career Resources',
      description:
        'Share job opportunities, internships, and career resources with students.',
      buttonText: 'Manage Resources',
      action: 'career-resources',
    },
    {
      icon: '📨',
      title: 'Mentorship Requests',
      description:
        'Review and respond to mentorship requests from students.',
      buttonText: 'View Requests',
      action: 'view-requests',
    },
    {
      icon: '🤝',
      title: 'My Mentees',
      description:
        'Manage active mentorships and track mentee progress.',
      buttonText: 'View Mentees',
      action: 'view-mentees',
    },
  ];

  const adminCards = [
    {
      icon: '👥',
      title: 'User Management',
      description:
        'Manage students, alumni, and platform access.',
      buttonText: 'Manage Users',
      action: 'manage-users',
    },
    {
      icon: '📊',
      title: 'Platform Analytics',
      description:
        'Monitor engagement, mentorship success, and growth metrics.',
      buttonText: 'View Analytics',
      action: 'view-analytics',
    },
  ];

  const getCardsForRole = () => {
    switch (userRole) {
      case 'alumni':
        return alumniCards;
      case 'admin':
        return adminCards;
      case 'student':
      default:
        return studentCards;
    }
  };

  return (
    <div className="dashboard-page">
      <DashboardHeader
        userName={userName}
        userRole={userRole}
        onLogout={handleLogout}
      />

      <main className="dashboard-main">
        <WelcomeSection userName={userName} role={userRole} />

        {/* Profile Completion Banner */}
        {userRole !== 'admin' && (
          <div className="profile-banner">
            <div className="profile-banner-content">
              <span className="profile-banner-text">
                {isProfileComplete
                  ? 'Update your profile to keep your information current'
                  : 'Complete your profile to unlock full features'}
              </span>
              <button
                className="profile-banner-button"
                onClick={() => handleButtonClick('complete-profile')}
              >
                {isProfileComplete ? 'Update Profile' : 'Complete Profile'}
              </button>
            </div>
          </div>
        )}

        <section className="dashboard-cards">
          <div className="cards-container">
            {getCardsForRole().map((card, index) => (
              <DashboardCard
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
                buttonText={card.buttonText}
                onButtonClick={() => handleButtonClick(card.action)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
