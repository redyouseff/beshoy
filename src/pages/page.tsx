import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Import components
import Hero from "../component/Home/Hero";
import Presentation from "../component/Home/Presentation";
import Services from "../component/Home/Services";
import Reviews from "../component/Home/Reviews";
import TeamSlider from "../component/Home/TeamSlider";
import AgentSlider from "../component/Home/AgentSlider";



const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500, // increase duration for smoother effect
      easing: "ease-in-out",
      once: true, // run animation only once
      mirror: false, // prevent animation on scroll back up
    });
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden overflow-y-hidden transition-all duration-500 bg-[#111612]">
      <div data-aos="fade-up" className="transition-transform ease-in-out">
        <Hero />
      </div>
     
    </div>
  );
};

export default Home;
