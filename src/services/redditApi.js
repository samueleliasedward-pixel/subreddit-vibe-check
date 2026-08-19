export async function getHotPosts(subreddit) {
  // Use allorigins.win with the correct endpoint format
  const targetUrl = `https://www.reddit.com/r/${subreddit}/hot.json?limit=50`;
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
  
  try {
    console.log(`Fetching real data from: ${proxyUrl}`);
    
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const result = await response.json();
    
    // Parse the contents (allorigins wraps the response)
    const data = JSON.parse(result.contents);
    
    if (!data.data || !data.data.children) {
      throw new Error('Invalid response from Reddit');
    }
    
    const posts = data.data.children.map(item => item.data);
    
    if (posts.length === 0) {
      throw new Error('No posts found in this subreddit');
    }
    
    console.log(`✅ Retrieved ${posts.length} real posts from r/${subreddit}`);
    return posts;
    
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }
}