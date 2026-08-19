import Sentiment from 'sentiment';

const analyzer = new Sentiment();

export function analyzeTitle(title) {
  try {
    const result = analyzer.analyze(title);
    
    let sentiment;
    if (result.score > 0) {
      sentiment = 'Positive';
    } else if (result.score < 0) {
      sentiment = 'Negative';
    } else {
      sentiment = 'Neutral';
    }
    
    return {
      score: result.score,
      sentiment: sentiment
    };
  } catch (error) {
    return {
      score: 0,
      sentiment: 'Neutral'
    };
  }
}
