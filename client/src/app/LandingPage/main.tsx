import React from "react";
import Hero from "./Hero/main";
import JoinSection from "./JoinSection";
import LandingAbout from "./LandingAbout";
import UpcomingEvents from "./UpcomingEvents";
import LatestJobs from "./LatestJobs";
import FAQ from "./Faq";
import Footer from "./Footer";
function LandingPage() {
  return (
    <div className="container mx-auto px-8">
      <Hero />
      <JoinSection />
      <LandingAbout />
      <UpcomingEvents />
      <LatestJobs />
      <FAQ />
      <Footer />
    </div>
  );
}

export default LandingPage;
