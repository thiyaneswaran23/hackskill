import { useState, useEffect } from 'react';
import './Dashboard.css';
import DashboardHeader from '../components/DashboardHeader';
import WelcomeSection from '../components/WelcomeSection';
import DashboardCard from '../components/DashboardCard';

function Dashboard() {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('student');

  useEffect(() => {
    // Safely read user from localStorage
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        setUserName(user.name || user.email || '');
        // Read role from user object or default to 'student'
        setUserRole(user.role?.toLowerCase() || 'student');
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
    // Placeholder for future routing logic
    console.log(`Action: ${action}`);
  };

  // Student Dashboard Cards
  const studentCards = [
    {
      icon: '👤',
      title: 'My Profile',
      description: 'View and manage your academic profile, skills, and career goals.',
      buttonText: 'View Profile',
      action: 'view-profile'
    },
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
    },
    {
      icon: '🗺️',
      title: 'Learning Roadmap',
      description: 'Access your personalized skill development roadmap tailored to your career goals and placement targets.',
      buttonText: 'View Roadmap',
      action: 'view-roadmap'
    }
  ];

  // Alumni Dashboard Cards
  const alumniCards = [
    {
      icon: '👤',
      title: 'My Profile',
      description: 'Manage your alumni profile, professional experience, and areas of expertise.',
      buttonText: 'View Profile',
      action: 'view-profile'
    },
    {
      icon: '📨',
      title: 'Mentorship Requests',
      description: 'Review and respond to incoming mentorship requests from students seeking guidance.',
      buttonText: 'View Requests',
      action: 'view-requests'
    },
    {
      icon: '🤝',
      title: 'Active Mentees',
      description: 'Manage your ongoing mentorship engagements and track progress with current mentees.',
      buttonText: 'View Mentees',
      action: 'view-mentees'
    },
    {
      icon: '📈',
      title: 'Impact & Feedback',
      description: 'View mentorship impact metrics, student feedback, and your contribution to placement outcomes.',
      buttonText: 'View Impact',
      action: 'view-impact'
    }
  ];

  // Admin Dashboard Cards
  const adminCards = [
    {
      icon: '👥',
      title: 'Manage Users',
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
    },
    {
      icon: '⚙️',
      title: 'AI Matching Controls',
      description: 'Configure and fine-tune AI matching algorithms and rules for optimal mentor-student pairings.',
      buttonText: 'Configure AI',
      action: 'configure-ai'
    },
    {
      icon: '🔧',
      title: 'System Settings',
      description: 'Manage platform configuration, feature toggles, and system-wide settings.',
      buttonText: 'System Settings',
      action: 'system-settings'
    }
  ];

  // Get cards based on role
  const getCardsForRole = () => {
    switch (userRole?.toLowerCase()) {
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
