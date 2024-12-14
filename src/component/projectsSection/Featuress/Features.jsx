import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

function Features() {
  const [featuresCards, setfeaturesCards] = useState([]); // State to store feature cards data
  const [loading, setLoading] = useState(true); // State to manage loading status

  // Fetch data from API
  useEffect(() => {
    const fetchFeaturesData = async () => {
      try {
        const response = await axios.get("https://sleepy-blinnie-beshoynasry-2859766e.koyeb.app/api/feature");
        setfeaturesCards(response.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching the feature data:", error);
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchFeaturesData();
  }, []);
  console.log(featuresCards)

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: false,
      mirror: true,
    });
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const maxDescriptionLength = 140;

  return (
    <div className="bg-[#111612] min-h-screen flex flex-col items-center pt-48 pb-12">
      <h2 className="text-5xl font-semibold text-white mb-14" data-aos="fade-down">
        Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl px-4 mb-20">
        {featuresCards?.map((card, index) => (
          <a
            href={`/Projects/Features2/${card._id}`} // Dynamic link with card ID
            key={index}
            className="bg-[#1c1e1b] rounded-lg shadow-lg p-6 text-center transform transition duration-300 hover:scale-105"
            data-aos="fade-up"
            data-aos-delay={`${index * 200}`}
          >
            <div className="overflow-hidden rounded-lg mb-6">
              <img
                src={card.imgSrcs?.[0] 
                  ? `https://sleepy-blinnie-beshoynasry-2859766e.koyeb.app${card.imgSrcs[0]}` 
                  : "/default-image.jpg"} 


                alt={card.title}
                className="w-full h-64 object-cover rounded-lg transform transition-transform duration-500 hover:scale-110"
              />
            </div>
            <h3 className="text-3xl font-semibold text-white mb-4">{card.title}</h3>
            <p className="text-[#a0b3b1] text-base leading-relaxed">
              {truncateText(card.description, maxDescriptionLength)}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Features;
