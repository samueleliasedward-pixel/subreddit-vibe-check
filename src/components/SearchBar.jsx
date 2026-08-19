import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, loading }) {
  const [input, setInput] = useState('technology');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <span className="subreddit-prefix">r/</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter subreddit name"
          className="search-input"
          disabled={loading}
        />
      </div>
      <button type="submit" className="search-button" disabled={loading}>
        {loading ? 'Checking...' : '🔍 Check Vibe'}
      </button>
    </form>
  );
}

export default SearchBar;
