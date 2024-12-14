import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function OffPlan() {
  const [offplan, setOffplan] = useState([]); // State to store off-plan data
  const [loading, setLoading] = useState(true); // State to manage loading status

  // Fetch data from API
  useEffect(() => {
    const fetchOffPlanData = async () => {
      try {
        const response = await axios.get("https://sleepy-blinnie-beshoynasry-2859766e.koyeb.app/api/off-plan");
        setOffplan(response.data); // Update state with fetched data
        
      } catch (error) {
        console.error("Error fetching the off-plan data:", error);
      } finally {
        setLoading(false); // Set loading to false
      }
    };
    

    fetchOffPlanData();
  }, []);
  console.log(offplan)

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: false,
      mirror: true,
    });
  }, []);

  // Truncate long text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const maxDescriptionLength = 140;

  return (
    <div className="bg-[#111612] min-h-screen flex flex-col items-center pt-48 pb-12">
      <h2
        className="text-5xl font-semibold text-white mb-14 mt-20"
        data-aos="fade-down"
      >
        Off Plan
      </h2>

      {loading ? (
        <p className="text-white text-lg">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl px-4 mb-32">
          {offplan?.map((item, index) => (
            <Link
              to={`/Projects/Off-Plan2/${item._id}`} // Use _id for dynamic routing
              key={item._id} // Use _id as the unique key
              className="bg-[#1c1e1b] rounded-lg shadow-lg p-6 text-center transform transition duration-300 hover:scale-105"
              data-aos="fade-up"
              data-aos-delay={`${index * 200}`}
            >
              <div className="overflow-hidden rounded-lg mb-6">
                <img
                   src={item.imgSrcs?.[0] 
                    ? `https://sleepy-blinnie-beshoynasry-2859766e.koyeb.app${item.imgSrcs[0]}` 
                    : "/default-image.jpg"} alt={item.title}
                  className="w-full h-40 sm:h-48 lg:h-64 object-cover rounded-lg transform transition-transform duration-500 hover:scale-110"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-[#a0b3b1] text-sm sm:text-base leading-relaxed">
                {truncateText(item.description, maxDescriptionLength)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default OffPlan;
