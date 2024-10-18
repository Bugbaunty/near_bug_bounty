import React from "react";
import Header from "../components/Header";
import Hero from "../components/landingpage/Hero";
import Features from "../components/landingpage/Features";
import Services from "../components/landingpage/Services";
import Roadmap from "../components/landingpage/Roadmap";
import Footer from "../components/landingpage/Footer";
import ButtonGradient from "../assets/svg/ButtonGradient";
const LandingPage = () => {
  return (
    <div className="pt-[4.75rem] lg:pt-[5.25rem] ">
      <Header />
      <Hero />
      <Features />
      <Services />
      <Roadmap />
      <Footer />
      <ButtonGradient />
    </div>
  );
};

export default LandingPage;
