import React from "react";
import Hero from "../components/Home/Hero.jsx";
import FeaturedJobs from "../components/Home/FeaturedJobs.jsx";
import WhyPlacemateAi from "../components/Home/WhyPlacemateAi.jsx";
import HowItWorks from "../components/Home/HowItWorks.jsx";
import CTA from "../components/Home/CTA.jsx";
import Footer from "../components/Footer.jsx";

function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-sky-100 to-indigo-50">
      <Hero />
      <FeaturedJobs />
      <WhyPlacemateAi />
      <HowItWorks />
      <CTA />
    </div>
  );
}

export default Home;
