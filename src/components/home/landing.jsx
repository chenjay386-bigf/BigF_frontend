import React from 'react';
import Hero from './Hero';
import ActiveChallenge from './ActiveChallenge';
import ExploreSection from './ExploreSection';
import TrendingRecipes from './TrendingRecipes';
import CommunityFeed from './CommunityFeed';
import './home.css';

export default function Landing() {
  return (
    <div className="home-container">
      <Hero />
      <ActiveChallenge />
      <ExploreSection />
      <TrendingRecipes />
      <CommunityFeed />
    </div>
  );
}