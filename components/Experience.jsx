// components/Experience.jsx
import { motion } from "framer-motion";
import { FaBriefcase, FaUniversity } from "react-icons/fa";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const experiences = [
    {
        title: "Google DSC CP Lead & Core",
        organization: "Google DSC NSUT, The Tech Society of NSUT",
        duration: "January 2023 - May 2024",
        location: "New Delhi, India",
        responsibilities: [
          "Organized and curated a recruitment coding contest, including problem creation and writing editorials.",
          "Conducted over 40 interviews for recruiting freshers and sophomores.",
        ],
        icon: <FaUniversity size={20} color="#1E3A8A" />,
      },
  {
    title: "Software Developer Intern",
    organization: "Blozum.AI",
    duration: "June 2024 - Present",
    location: "New Delhi, India",
    responsibilities: [
      "Developed and deployed WhatsApp bots using RML API, Facebook Graph API, and Google Calendar API for scheduling interviews and interactive sessions.",
      "Created a LinkedIn automation tool with Selenium and Python, saving the team 30 hours weekly.",
      "Designed an automated contract template solution, saving over 60 hours monthly.",
    ],
    icon: <FaBriefcase size={20} color="#14B8A6" />,
  }

  // Add more experiences as needed
];

const ExperienceItem = ({ exp, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className={`flex ${
        index % 2 === 0 ? "flex-row-reverse" : "flex-row"
      } items-start`}
      initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      {/* Connector Dot with Expand/Collapse */}
      <div
        className="w-8 h-8 bg-accent rounded-full flex items-center justify-center relative z-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
        aria-label={`Toggle details for ${exp.title}`}
        onKeyPress={(e) => {
          if (e.key === "Enter") setIsOpen(!isOpen);
        }}
      >
        {exp.icon}
        {isOpen ? (
          <FaChevronUp
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-text-light"
            size={12}
          />
        ) : (
          <FaChevronDown
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-text-light"
            size={12}
          />
        )}
      </div>

      {/* Content */}
      <div className="w-full mt-4 md:mt-0 px-6">
        <div className="bg-background dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-3xl transition-shadow duration-300">
          <h3 className="text-2xl font-bold text-text-light">
            {exp.title}
          </h3>
          <span className="text-gray-400">
            {exp.organization} | {exp.duration} | {exp.location}
          </span>
          <ul className={`mt-4 list-disc list-inside text-text ${isOpen ? "block" : "hidden"}`}>
            {exp.responsibilities.map((item, idx) => (
              <li key={idx} className="mb-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section
      id="experience"
      className="relative min-h-screen flex flex-col justify-center bg-background text-text py-20 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Example: Floating Dots */}
        <div className="absolute top-10 left-10 w-4 h-4 bg-accent rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-6 h-6 bg-primary rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-secondary rounded-full opacity-50 animate-bounce"></div>
        {/* Add more decorative elements as desired */}
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.h2
          className="text-4xl font-semibold mb-12 text-text-light text-center"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          My Experience
        </motion.h2>

        {/* Experiences Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-accent"></div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <ExperienceItem key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
