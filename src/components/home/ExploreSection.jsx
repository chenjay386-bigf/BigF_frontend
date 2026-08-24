import React from 'react';

export default function ExploreSection() {
  return (
    <section className="explore">
      <h2>Explore</h2>
      <div className="explore-grid">
        <div className="explore-card">
          <span className="icon">🍜</span>
          <h3>Trending Recipes</h3>
          <p>See what everyone is cooking</p>
        </div>
        <div className="explore-card">
          <span className="icon">🏆</span>
          <h3>Previous Challenges</h3>
          <p>Past winners and competitions</p>
        </div>
        <div className="explore-card">
          <span className="icon">⭐</span>
          <h3>Leaderboard</h3>
          <p>Top creators this week</p>
        </div>
        <div className="explore-card">
          <span className="icon">📸</span>
          <h3>Community Feed</h3>
          <p>Latest recipe uploads</p>
        </div>
      </div>
    </section>
  );
}