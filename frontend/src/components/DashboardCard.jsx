import './DashboardCard.css';

function DashboardCard({ icon, title, description, buttonText, onButtonClick }) {
  return (
    <div className="dashboard-card">
      <div className="card-icon">{icon}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      <button className="card-button" onClick={onButtonClick}>
        {buttonText}
      </button>
    </div>
  );
}

export default DashboardCard;
