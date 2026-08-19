import React from 'react';
import './StatsCards.css';

function StatsCards({ positive, neutral, negative }) {
  return (
    <div className="stats-cards">
      <div className="stat-card positive">
        <div className="stat-emoji">😊</div>
        <div className="stat-label">Positive</div>
        <div className="stat-count">{positive}</div>
      </div>
      <div className="stat-card neutral">
        <div className="stat-emoji">😐</div>
        <div className="stat-label">Neutral</div>
        <div className="stat-count">{neutral}</div>
      </div>
      <div className="stat-card negative">
        <div className="stat-emoji">😞</div>
        <div className="stat-label">Negative</div>
        <div className="stat-count">{negative}</div>
      </div>
    </div>
  );
}

export default StatsCards;
