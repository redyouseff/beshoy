import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

function Projects() {
  const [offplan, setOffplan] = useState([]);
  const [features, setFeatures] = useState([]);
  const [luxury, setLuxury] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from APIs
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch Off-Plan Projects
        const offplanResponse = await axios.get("https://sleepy-blinnie-beshoynasry-2859766e.koyeb.app/api/off-plan");
        setOffplan(offplanResponse.data);

        // Fetch Features Projects
        const featuresResponse = await axios.get("https://sleepy-blinnie-beshoynasry-2859766e.koyeb.app/api/feature");
        setFeatures(featuresResponse.data);

        // Fetch Luxury Projects
        const luxuryResponse = await axios.get("https://sleepy-blinnie-beshoynasry-2859766e.koyeb.app/api/laxury");
        setLuxury(luxuryResponse.data);
      } catch (error) {
        console.error("Error fetching project data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: false,
      mirror: true,
    });
  }, []);

  // Helper function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const maxDescriptionLength = 120;
  console.log(offplan)

  return (
    <div className="bg-[#111612] min-h-screen flex flex-col items-center pt-48 pb-12">
      {/* Off Plan Section */}
      <h2 className="text-5xl font-semibold text-white mb-14 mt-20" data-aos="fade-down">
        Off Plan
      </h2>
      {loading ? (
        <p className="text-white text-xl">Loading...</p>
      ) : offplan.length === 0 ? (
        <p className="text-white text-xl">No off-plan projects available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl px-4 mb-32">
          {offplan.map((project, index) => (
            <a
              href={`/Projects/Off-Plan2/${project._id}`}
              key={project._id}
              className="bg-[#1c1e1b] rounded-lg shadow-lg p-6 text-center transform transition duration-300 hover:scale-105"
              data-aos="fade-up"
              data-aos-delay={`${index * 200}`}
            >
              <div className="overflow-hidden rounded-lg mb-6">
                <img
                  src={`https://sleepy-blinnie-beshoynasry-2859766e.koyeb.app${project?.imgSrcs?.[0]}` || "/default-image.jpg"}
                  alt={project.title}
                  className="w-full h-64 object-cover rounded-lg transform transition-transform duration-500 hover:scale-110"
                />
              </div>
              <h3 className="text-3xl font-semibold text-white mb-4">{project.title}</h3>
              <p className="text-[#a0b3b1] text-base leading-relaxed">
                {truncateText(project.description, maxDescriptionLength)}
              </p>
            </a>
          ))}
        </div>
      )}

      {/* Features Section */}
      <h2 className="text-5xl font-semibold text-white mb-14" data-aos="fade-down">
        Features
      </h2>
      {loading ? (
        <p className="text-white text-xl">Loading...</p>
      ) : features.length === 0 ? (
        <p className="text-white text-xl">No features projects available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl px-4 mb-32">
          {features.map((project, index) => (
            <a
              href={`/Projects/Features2/${project._id}`}
              key={project._id}
              className="bg-[#1c1e1b] rounded-lg shadow-lg p-6 text-center transform transition duration-300 hover:scale-105"
              data-aos="fade-up"
              data-aos-delay={`${index * 200}`}
            >
              <div className="overflow-hidden rounded-lg mb-6">
              <img
                  src={`https://sleepy-blinnie-beshoynasry-2859766e.koyeb.app${project?.imgSrcs?.[0]}` || "/default-image.jpg"}
                  alt={project.title}
                  className="w-full h-64 object-cover rounded-lg transform transition-transform duration-500 hover:scale-110"
                />
              </div>
              <h3 className="text-3xl font-semibold text-white mb-4">{project.title}</h3>
              <p className="text-[#a0b3b1] text-base leading-relaxed">
                {truncateText(project.description, maxDescriptionLength)}
              </p>
            </a>
          ))}
        </div>
      )}

      {/* Luxury Section */}
      <h2 className="text-5xl font-semibold text-white mb-14" data-aos="fade-down">
        Luxury
      </h2>
      {loading ? (
        <p className="text-white text-xl">Loading...</p>
      ) : luxury.length === 0 ? (
        <p className="text-white text-xl">No luxury projects available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl px-4 mb-32">
          {luxury.map((project, index) => (
            <a
              href={`/Projects/Luxury2/${project._id}`}
              key={project._id}
              className="bg-[#1c1e1b] rounded-lg shadow-lg p-6 text-center transform transition duration-300 hover:scale-105"
              data-aos="fade-up"
              data-aos-delay={`${index * 200}`}
            >
              <div className="overflow-hidden rounded-lg mb-6">
              <img
                  src={`https://sleepy-blinnie-beshoynasry-2859766e.koyeb.app${project?.imgSrcs?.[0]}` || "/default-image.jpg"}
                  alt={project.title}
                  className="w-full h-64 object-cover rounded-lg transform transition-transform duration-500 hover:scale-110"
                />
              </div>
              <h3 className="text-3xl font-semibold text-white mb-4">{project.title}</h3>
              <p className="text-[#a0b3b1] text-base leading-relaxed">
                {truncateText(project.description, maxDescriptionLength)}
              </p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;
