export default async function handler(req, res) {
  // Enable CORS for local development
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
    const url = `https://www.reddit.com/r/${subreddit}/hot.json?limit=50`;
    
    const response = await fetch(url);
    
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
    
    // Return proper JSON response
    return res.status(200).json({ posts });
    
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to fetch from Reddit: ' + error.message
    });
  }
}
