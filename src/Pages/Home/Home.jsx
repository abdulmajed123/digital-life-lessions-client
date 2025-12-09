// HeroSlider.jsx
// Single-file React component (default export) that uses TailwindCSS classes.
// - Auto-plays slides
// - Keyboard & swipe friendly
// - Previous / Next controls + indicators
// - Accessible (aria) and responsive

import React from "react";
import HeroSlider from "../../Component/HeroSlider/HeroSlider";
import WhyLearningMatters from "../../Component/WhyLearningMatters/WhyLearningMatters";
import TopContributors from "../../Component/TopContributors/TopContributors";
import MostSavedLessons from "../../Component/MostSavedLessons/MostSavedLessons";
import FeaturedLessons from "../../Component/FeaturedLessons/FeaturedLessons";

const Home = () => {
  return (
    <div>
      <HeroSlider></HeroSlider>
      <FeaturedLessons></FeaturedLessons>
      <WhyLearningMatters></WhyLearningMatters>
      <TopContributors></TopContributors>
      <MostSavedLessons></MostSavedLessons>
    </div>
  );
};

export default Home;
