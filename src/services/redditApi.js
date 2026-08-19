export async function getHotPosts(subreddit) {
  // Use Reddit's JSON endpoint (works with CORS)
  const url = `https://www.reddit.com/r/${subreddit}/.json?limit=50`;
  
  try {
    console.log(`Fetching real data from: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; RedditVibeCheck/1.0)'
      }
    });
    
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
    
    console.log(`✅ Retrieved ${posts.length} real posts from r/${subreddit}`);
    return posts;
    
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }
}