import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- import useNavigate
import './Dashboard.css';
import DashboardHeader from '../components/DashboardHeader';
import WelcomeSection from '../components/WelcomeSection';
import DashboardCard from '../components/DashboardCard';

function Dashboard() {
  const navigate = useNavigate(); // <-- initialize navigate
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

  const handleButtonClick = (action) => {
    switch(action) {
      case 'complete-profile':
        navigate('/profile-setup'); // <-- navigate to ProfileSetup page
        break;
      case 'find-mentor':
        navigate('/mentors');
        break;
      case 'view-progress':
        navigate('/progress');
        break;
      case 'view-requests':
        navigate('/mentorship-requests');
        break;
      case 'view-mentees':
        navigate('/my-mentees');
        break;
      case 'manage-users':
        navigate('/admin/users');
        break;
      case 'view-analytics':
        navigate('/admin/analytics');
        break;
      default:
        console.log(`Unknown action: ${action}`);
    }
  };

  // Dashboard cards
  const studentCards = [
    {
      icon: '🤖',
      title: 'AI Mentor Match',
      description: 'Get AI-powered recommendations for alumni mentors who align with your career path and skill development needs.',
      buttonText: 'Find Mentor',
      action: 'find-mentor'
    },
    {
      icon: '📊',
      title: 'Progress & Outcomes',
      description: 'Track your skill growth, mentorship milestones, and placement readiness metrics in real-time.',
      buttonText: 'View Progress',
      action: 'view-progress'
    }
  ];

  const alumniCards = [
    {
      icon: '📨',
      title: 'Mentorship Requests',
      description: 'Review and respond to incoming mentorship requests from students seeking guidance.',
      buttonText: 'View Requests',
      action: 'view-requests'
    },
    {
      icon: '🤝',
      title: 'My Mentees',
      description: 'Manage your ongoing mentorship engagements and track progress with current mentees.',
      buttonText: 'View Mentees',
      action: 'view-mentees'
    }
  ];

  const adminCards = [
    {
      icon: '👥',
      title: 'User Management',
      description: 'Overview and management of all students and alumni accounts on the platform.',
      buttonText: 'Manage Users',
      action: 'manage-users'
    },
    {
      icon: '📊',
      title: 'Platform Analytics',
      description: 'Comprehensive analytics on platform usage, engagement metrics, and mentorship success rates.',
      buttonText: 'View Analytics',
      action: 'view-analytics'
    }
  ];

  const getCardsForRole = () => {
    switch (userRole?.toLowerCase()) {
      case 'alumni': return alumniCards;
      case 'admin': return adminCards;
      case 'student':
      default: return studentCards;
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

        {/* Profile Completion / Update Banner */}
{userRole !== 'admin' && (
  <div className="profile-banner">
    <div className="profile-banner-content">
      <span className="profile-banner-text">
        {isProfileComplete
          ? "Update your profile to keep your information current"
          : "Complete your profile to unlock full features"}
      </span>
      <button 
        className="profile-banner-button"
        onClick={() => handleButtonClick('complete-profile')}
      >
        {isProfileComplete ? "Update Profile" : "Complete Profile"}
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
