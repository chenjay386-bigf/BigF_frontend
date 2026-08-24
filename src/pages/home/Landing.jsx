import React from "react";
import Hero from "../../components/home/Hero.jsx";
import ActiveChallenge from "../../components/home/ActiveChallenge.jsx";
import ExploreSection from "../../components/home/ExploreSection.jsx";
import TrendingRecipes from "../../components/home/TrendingRecipes.jsx";
import CommunityFeed from "../../components/home/CommunityFeed.jsx";

export default function Landing() {
  return (
    <div className="landing-container">
      <Hero />
      <ActiveChallenge />
      <ExploreSection />
      <TrendingRecipes />
      <CommunityFeed />
    </div>
  );
}