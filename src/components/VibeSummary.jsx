import React from 'react';
import './VibeSummary.css';

function VibeSummary({ overallVibe, averageScore, total }) {
  const getEmoji = () => {
    if (overallVibe === 'Positive') return '😊';
    if (overallVibe === 'Negative') return '😞';
    return '😐';
  };

  const getColor = () => {
    if (overallVibe === 'Positive') return 'positive';
    if (overallVibe === 'Negative') return 'negative';
    return 'neutral';
  };

  return (
    <div className={`vibe-summary ${getColor()}`}>
      <div className="vibe-emoji">{getEmoji()}</div>
      <div className="vibe-text">
        <h2>{overallVibe} Vibe</h2>
        <p>Based on {total} hot posts</p>
        <p className="average-score">Average Sentiment: {averageScore.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default VibeSummary;
