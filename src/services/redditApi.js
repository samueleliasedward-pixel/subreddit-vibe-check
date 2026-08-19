export async function getHotPosts(subreddit) {
  // Use a working Reddit API wrapper
  const url = `https://www.reddit.com/r/${subreddit}/hot.json?limit=50`;
  
  try {
    // Use a different proxy that works on Vercel
    const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.data || !data.data.children) {
      throw new Error('Invalid response');
    }
    
    const posts = data.data.children.map(item => item.data);
    console.log(`✅ Got ${posts.length} real posts from r/${subreddit}`);
    return posts;
    
  } catch (error) {
    console.error('Proxy failed, trying fallback...');
    
    // Fallback: Use a different proxy
    try {
      const fallbackUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      const response = await fetch(fallbackUrl);
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      
      if (!data.data || !data.data.children) {
        throw new Error('Invalid response');
      }
      
      const posts = data.data.children.map(item => item.data);
      console.log(`✅ Got ${posts.length} real posts from r/${subreddit} (fallback)`);
      return posts;
      
    } catch (fallbackError) {
      console.error('All proxies failed, using sample data');
      return getSampleData(subreddit);
    }
  }
}

function getSampleData(subreddit) {
  const samplePosts = [
    { title: `Amazing new developments in ${subreddit}`, ups: 12421, num_comments: 832, author: "techguru" },
    { title: `Why is everything broken in ${subreddit}?`, ups: 4200, num_comments: 421, author: "frustrateduser" },
    { title: `Here's what happened in ${subreddit} today`, ups: 3100, num_comments: 156, author: "devupdates" },
    { title: `I love how the ${subreddit} community helps`, ups: 8900, num_comments: 234, author: "helpfulperson" },
    { title: `This ${subreddit} product is a disaster`, ups: 5600, num_comments: 789, author: "critic123" },
    { title: `New AI breakthrough in ${subreddit}`, ups: 15300, num_comments: 567, author: "aifuture" },
    { title: `The future of ${subreddit} is here`, ups: 6700, num_comments: 345, author: "webdevpro" },
    { title: `I can't believe this ${subreddit} update`, ups: 3400, num_comments: 234, author: "angryuser" },
    { title: `This ${subreddit} community is supportive`, ups: 4500, num_comments: 123, author: "happyuser" },
    { title: `Why does ${subreddit} keep changing?`, ups: 2800, num_comments: 456, author: "confusedperson" }
  ];
  
  return samplePosts.map(post => ({
    ...post,
    score: Math.floor(Math.random() * 10) - 3
  }));
}