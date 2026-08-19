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
    const url = `https://www.reddit.com/r/${subreddit}/hot.json?limit=50`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json'
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