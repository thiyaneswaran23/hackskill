import './DashboardHeader.css';

function DashboardHeader({ userName, userRole, onLogout }) {
  const getRoleLabel = (role) => {
    const roleMap = {
      student: 'Student',
      alumni: 'Alumni',
      admin: 'Admin'
    };
    return roleMap[role?.toLowerCase()] || 'Student';
  };

  const getRoleClass = (role) => {
    return `role-badge role-badge-${role?.toLowerCase() || 'student'}`;
  };

  return (
    <header className="dashboard-header">
      <div className="header-container">
        <div className="header-logo">AlumniConnect</div>
        <div className="header-right">
          <span className="user-name">{userName || 'User'}</span>
          <span className={getRoleClass(userRole)}>
            {getRoleLabel(userRole)}
          </span>
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
