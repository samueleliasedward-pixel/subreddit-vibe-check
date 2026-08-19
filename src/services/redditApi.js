export async function getHotPosts(subreddit) {
  // Using working CORS proxy for real Reddit data
  const targetUrl = `https://www.reddit.com/r/${subreddit}/hot.json?limit=50`;
  const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
  
  try {
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.data || !data.data.children) {
      throw new Error('Invalid response from Reddit');
    }
    
    const posts = data.data.children.map(item => item.data);
    
    if (posts.length === 0) {
      throw new Error('No posts found in this subreddit');
    }
    
    return posts;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }
}