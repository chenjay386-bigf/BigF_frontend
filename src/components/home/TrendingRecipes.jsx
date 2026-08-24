
import React from 'react';

export default function TrendingRecipes() {
  return (
    <section className="recipes">
      <h2>🔥 Trending Recipes</h2>
      <div className="recipe-list">
        <div className="recipe-card">
          <div className="recipe-image-placeholder">🍗</div>
          <h3>Chicken Noodles Special</h3>
        </div>
        <div className="recipe-card">
          <div className="recipe-image-placeholder">🥩</div>
          <h3>Spicy Beef Stir-Fry</h3>
        </div>
        <div className="recipe-card">
          <div className="recipe-image-placeholder">🥦</div>
          <h3>Vegetable Delight</h3>
        </div>
      </div>
    </section>
  );
}