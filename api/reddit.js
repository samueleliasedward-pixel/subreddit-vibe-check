export default async function handler(req, res) {
  // Enable CORS for the response
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { subreddit } = req.query;
  
  if (!subreddit) {
    return res.status(400).json({ error: 'Subreddit parameter is required' });
  }

  try {
    // Try old.reddit.com which has better compatibility
    const url = `https://old.reddit.com/r/${subreddit}/.json?limit=50`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RedditVibeCheck/1.0; +https://github.com/samueleliasedward-pixel/subreddit-vibe-check)',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });
    
    if (!response.ok) {
      return res.status(response.status).json({ 
        error: `Reddit API returned ${response.status}` 
      });
    }
    
    const data = await response.json();
    
    if (!data.data || !data.data.children) {
      return res.status(500).json({ error: 'Invalid response from Reddit' });
    }
    
    const posts = data.data.children.map(item => item.data);
    
    return res.status(200).json({ posts });
    
  } catch (error) {
    console.error('Reddit API error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch from Reddit: ' + error.message 
    });
  }
}