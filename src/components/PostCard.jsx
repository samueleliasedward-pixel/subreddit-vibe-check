import React from 'react';
import './PostCard.css';

function PostCard({ post }) {
  const getEmoji = () => {
    if (post.sentiment === 'Positive') return '😊';
    if (post.sentiment === 'Negative') return '😞';
    return '😐';
  };

  const getSentimentColor = () => {
    if (post.sentiment === 'Positive') return 'positive';
    if (post.sentiment === 'Negative') return 'negative';
    return 'neutral';
  };

  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className={`post-card ${getSentimentColor()}`}>
      <div className="post-header">
        <span className="post-emoji">{getEmoji()}</span>
        <span className="post-sentiment">{post.sentiment}</span>
        <span className="post-score">Score: {post.score > 0 ? '+' : ''}{post.score}</span>
      </div>
      <h3 className="post-title">{post.title}</h3>
      <div className="post-meta">
        <span>👍 {formatNumber(post.ups)}</span>
        <span>💬 {formatNumber(post.num_comments)}</span>
        <span>👤 u/{post.author}</span>
      </div>
    </div>
  );
}

export default PostCard;
