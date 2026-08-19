export async function getHotPosts(subreddit) {
  // Since Reddit API blocks CORS, using sample data for demonstration
  console.log(`Fetching sample data for r/${subreddit}`);
  
  // Realistic sample posts from various subreddits
  const samplePosts = {
    technology: [
      { title: "This new technology is absolutely amazing", ups: 12421, num_comments: 832, author: "techguru" },
      { title: "Why is everything broken today?", ups: 4200, num_comments: 421, author: "frustrateduser" },
      { title: "Here's what happened in today's update", ups: 3100, num_comments: 156, author: "devupdates" },
      { title: "I love how this community helps each other", ups: 8900, num_comments: 234, author: "helpfulperson" },
      { title: "This product is a complete disaster", ups: 5600, num_comments: 789, author: "critic123" },
      { title: "New AI breakthrough announced today", ups: 15300, num_comments: 567, author: "aifuture" },
      { title: "The future of web development is here", ups: 6700, num_comments: 345, author: "webdevpro" },
      { title: "I can't believe how bad this update is", ups: 3400, num_comments: 234, author: "angryuser" },
      { title: "This community is so supportive", ups: 4500, num_comments: 123, author: "happyuser" },
      { title: "Why does this keep happening?", ups: 2800, num_comments: 456, author: "confusedperson" }
    ],
    gaming: [
      { title: "This game is absolutely incredible", ups: 15400, num_comments: 1200, author: "gamerpro" },
      { title: "The new update ruined everything", ups: 3200, num_comments: 450, author: "angrygamer" },
      { title: "Best gaming experience I've ever had", ups: 9800, num_comments: 678, author: "happygamer" },
      { title: "Why is the matchmaking so broken?", ups: 2100, num_comments: 234, author: "competitiveplayer" },
      { title: "This game changed my life", ups: 7800, num_comments: 345, author: "inspiredgamer" }
    ],
    movies: [
      { title: "Best movie I've seen this year", ups: 23400, num_comments: 1500, author: "movielover" },
      { title: "This sequel was a huge disappointment", ups: 5600, num_comments: 789, author: "moviecritic" },
      { title: "The cinematography is breathtaking", ups: 8900, num_comments: 456, author: "filmnerd" }
    ]
  };
  
  // Return sample data for the requested subreddit, or default to technology
  const posts = samplePosts[subreddit.toLowerCase()] || samplePosts.technology;
  
  // Add random scores to simulate real sentiment variation
  return posts.map(post => ({
    ...post,
    score: Math.floor(Math.random() * 10) - 3 // Random score between -3 and +6
  }));
}