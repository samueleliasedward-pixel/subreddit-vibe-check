export default async function handler(req, res) {
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
    // Using a public Reddit API proxy that works
    const url = `https://www.reddit.com/r/${subreddit}/hot.json?limit=50`;
    
    // Use a different proxy service
    const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`;
    
    const response = await fetch(proxyUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RedditVibeCheck/1.0)',
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      // Fallback to another proxy
      const fallbackUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
      const fallbackResponse = await fetch(fallbackUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; RedditVibeCheck/1.0)'
        }
      });
      
      if (!fallbackResponse.ok) {
        throw new Error(`Both proxies failed: ${response.status}, ${fallbackResponse.status}`);
      }
      
      const data = await fallbackResponse.json();
      if (!data.data || !data.data.children) {
        throw new Error('Invalid response from Reddit');
      }
      const posts = data.data.children.map(item => item.data);
      return res.status(200).json({ posts });
    }
    
    const data = await response.json();
    
    if (!data.data || !data.data.children) {
      throw new Error('Invalid response from Reddit');
    }
    
    const posts = data.data.children.map(item => item.data);
    return res.status(200).json({ posts });
    
  } catch (error) {
    console.error('Reddit API error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch posts: ' + error.message 
    });
  }
}