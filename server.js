import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());

app.get("/api/reddit", async (req, res) => {
  const { subreddit } = req.query;

  if (!subreddit) {
    return res.status(400).json({ error: "Subreddit parameter is required" });
  }

  try {
    const url = `https://www.reddit.com/r/${subreddit}/hot.json?limit=50`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Reddit API returned ${response.status}`
      });
    }

    const data = await response.json();

    if (!data.data || !data.data.children) {
      return res.status(500).json({ error: "Invalid response from Reddit" });
    }

    const posts = data.data.children.map(item => item.data);
    return res.json({ posts });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch from Reddit: " + error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ API Server running on http://localhost:${PORT}`);
});