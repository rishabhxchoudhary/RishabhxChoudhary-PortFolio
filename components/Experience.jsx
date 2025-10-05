// components/Experience.jsx
import { motion } from "framer-motion";
import { FaBriefcase, FaUniversity } from "react-icons/fa";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const experiences = [
    {
    title: "Founding Engineer",
    organization: "ContraVault AI",
    duration: "October 2024 - Present",
    location: "Bengaluru, Karnataka",
    type: "Full-time",
    responsibilities: [
      "Built and optimized low-latency backend APIs with server-side caching, SQS queues, and SSE streaming, improving real-time updates for 22k+ daily financial tenders and reducing median latency",
      "Designed and operated AWS infrastructure (ECS, Lambda, Step Functions, IAM, S3, CloudWatch, Nginx) with security controls aligned to SOC 2, GDPR, CERT-IN, and ISO 27001 practices",
      "Integrated OpenSearch for fast document retrieval and DynamoDB single-table design with Redis for scalable, fault-tolerant data modeling",
      "Built and scaled customer-facing dashboards using React + TypeScript, ensuring responsive UI and smooth data visualization with end-to-end REST API integration",
      "Delivered credit-based free/paid access model for B2C customers and collaborated with designers to turn Figma mockups into production-ready features",
      "Advocated engineering excellence: type-safe contracts, code reviews, unit/integration tests (Pytest/Jest), and structured observability (logs, metrics, alerts)",
    ],
    icon: <FaBriefcase size={20} color="#14B8A6" />,
  },
  {
    title: "Software Developer Intern",
    organization: "Blozum",
    duration: "May 2024 - Present",
    location: "Remote",
    type: "Internship",
    responsibilities: [
      "Developed and deployed WhatsApp bots using RML API, Facebook Graph API, and Google Calendar API for scheduling interviews and interactive sessions.",
      "Created a LinkedIn automation tool with Selenium and Python, saving the team 30 hours weekly.",
      "Designed an automated contract template solution, saving over 60 hours monthly.",
      "Worked with Vector Databases and different approaches for efficient and effective querying from large vector database.",
    ],
    icon: <FaBriefcase size={20} color="#14B8A6" />,
  },
  {
    title: "Core",
    organization: "Google DSC NSUT",
    duration: "August 2023 - Present",
    location: "New Delhi, Delhi, India",
    responsibilities: [
      "Organized and curated a recruitment coding contest, including problem creation and writing editorials.",
      "Conducted over 40 interviews for recruiting freshers and sophomores.",
    ],
    icon: <FaUniversity size={20} color="#FBBF24" />,
  },
  {
    title: "Full Stack Web Developer Intern",
    organization: "InGelt",
    duration: "February 2023 - March 2023",
    location: "New Delhi, Delhi, India",
    responsibilities: [
      "Built production features on the MERN stack, focusing on API design, performance, and responsive UX",
      "Delivered client websites with UX enhancements and responsive layouts",
      "Collaborated with product/design to iterate quickly while maintaining code quality",
    ],
    icon: <FaBriefcase size={20} color="#14B8A6" />,
  },
  {
    title: "Competitive Programming Lead",
    organization: "Google DSC NSUT",
    duration: "January 2023 - August 2023",
    location: "New Delhi, Delhi, India",
    responsibilities: [
      "Organized and curated programming contests, including problem creation and solution verifications.",
    ],
    icon: <FaUniversity size={20} color="#FBBF24" />,
  },
  {
    title: "YouTuber",
    organization: "Codenzyme",
    duration: "May 2022 - July 2024",
    location: "India",
    responsibilities: [
      "Created and published educational content on algorithms and various programming topics, amassing over 12000 views on the first video.",
      "Provided tutorials on using torrents via Google Colab, aiding NSUT students during network restrictions.",
      "Produced content on competitive programming, data structures, and algorithms to help students enhance their coding skills.",
    ],
    icon: <FaBriefcase size={20} color="#14B8A6" />,
  },
];

const ExperienceItem = ({ exp, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Determine if the item should be centered (for odd items)
  const isCentered = false;
  return (
    <motion.div
      className={`flex flex-col md:flex-row items-start ${
        isCentered
          ? "md:flex-row"
          : index % 2 === 1
            ? "md:flex-row-reverse"
            : "md:flex-row"
      }`}
      initial={{ opacity: 0, x: index % 2 === 1 ? 100 : -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      {/* Connector Dot with Expand/Collapse */}
      <div className="relative flex flex-col items-center">
        {/* Connector Line */}
        <div
          className={`hidden md:block absolute top-0 ${isCentered ? "h-full" : "h-full"} border-l-2 border-accent`}
        ></div>

        {/* Connector Dot */}
        <div
          className="w-8 h-8 bg-accent rounded-full flex items-center justify-center z-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          tabIndex={0}
          role="button"
          aria-expanded={isOpen}
          aria-label={`Toggle details for ${exp.title}`}
          onKeyPress={(e) => {
            if (e.key === "Enter") setIsOpen(!isOpen);
          }}
        >
          {/* {exp.icon} */}
          {isOpen ? (
            <FaChevronUp
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
              size={12}
            />
          ) : (
            <FaChevronDown
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
              size={12}
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={`z-10 mt-4 cursor-pointer md:mt-0 md:px-6 lg:px-12 w-full ${isCentered ? "md:w-1/2" : "md:w-1/2"}`}
      >
        <div className="bg-background-dark p-6 rounded-lg shadow-lg hover:shadow-3xl transition-shadow duration-300">
          <h3 className="text-2xl font-bold text-text-light">{exp.title}</h3>
          <span className="text-gray-400">
            {exp.organization} | {exp.duration} | {exp.location}
            {exp.type && ` | ${exp.type}`}
          </span>
          <ul
            className={`mt-4 list-disc list-inside text-text ${isOpen ? "block" : "hidden"}`}
          >
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

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
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
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-accent"></div>

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
