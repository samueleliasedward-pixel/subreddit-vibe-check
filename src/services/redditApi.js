export async function getHotPosts(subreddit) {
  const url = `/api/reddit?subreddit=${encodeURIComponent(subreddit)}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.posts || data.posts.length === 0) {
      throw new Error('No posts found in this subreddit');
    }
    
    return data.posts;
  } catch (error) {
    console.error('API error:', error);
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }
}