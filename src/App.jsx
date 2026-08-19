import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import StatsCards from './components/StatsCards';
import VibeSummary from './components/VibeSummary';
import PostCard from './components/PostCard';
import { getHotPosts } from './services/redditApi';
import { analyzeTitle } from './utils/sentiment';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [subreddit, setSubreddit] = useState('technology');

  const fetchPosts = async (subredditInput) => {
    setLoading(true);
    setError('');
    setPosts([]);

    let cleanSubreddit = subredditInput.trim();
    cleanSubreddit = cleanSubreddit.replace(/^r\//, '');

    try {
      const rawPosts = await getHotPosts(cleanSubreddit);
      const analyzedPosts = rawPosts.map(post => ({
        ...post,
        ...analyzeTitle(post.title)
      }));
      setPosts(analyzedPosts);
      setSubreddit(cleanSubreddit);
    } catch (err) {
      setError(err.message || 'Failed to fetch posts. Please check the subreddit name.');
    } finally {
      setLoading(false);
    }
  };

  const positiveCount = posts.filter(p => p.sentiment === 'Positive').length;
  const neutralCount = posts.filter(p => p.sentiment === 'Neutral').length;
  const negativeCount = posts.filter(p => p.sentiment === 'Negative').length;
  
  const averageScore = posts.length > 0 
    ? posts.reduce((sum, p) => sum + p.score, 0) / posts.length 
    : 0;

  let overallVibe = 'Neutral';
  if (positiveCount > negativeCount) overallVibe = 'Positive';
  else if (negativeCount > positiveCount) overallVibe = 'Negative';

  return (
    <div className="app">
      <header className="header">
        <h1>📊 The Subreddit Vibe Check</h1>
        <p>Discover what Reddit is feeling right now</p>
      </header>

      <SearchBar onSearch={fetchPosts} loading={loading} />

      {error && (
        <div className="error-message">
          ❌ {error}
        </div>
      )}

      {loading && (
        <div className="loading-message">
          <div className="spinner"></div>
          <p>Fetching the latest posts...</p>
        </div>
      )}

      {!loading && posts.length > 0 && (
        <>
          <StatsCards 
            positive={positiveCount} 
            neutral={neutralCount} 
            negative={negativeCount} 
          />

          <VibeSummary 
            overallVibe={overallVibe} 
            averageScore={averageScore}
            total={posts.length}
          />

          <div className="posts-section">
            <h2>🔥 Hot Posts</h2>
            <div className="posts-grid">
              {posts.map((post, index) => (
                <PostCard key={post.id || index} post={post} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
