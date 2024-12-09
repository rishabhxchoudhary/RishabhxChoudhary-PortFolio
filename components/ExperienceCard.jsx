// components/ExperienceCard.jsx
import { motion } from "framer-motion";
import { FaBriefcase, FaLaptopCode } from "react-icons/fa";

const experiences = [
  {
    title: "Software Developer",
    company: "Tech Solutions Inc.",
    duration: "Jan 2022 - Present",
    description: "Developed and maintained web applications using React and Node.js, improving performance by 30%.",
    icon: <FaBriefcase size={30} />,
  },
  {
    title: "IoT Specialist",
    company: "Innovatech",
    duration: "Jun 2020 - Dec 2021",
    description: "Designed IoT solutions for smart home devices, enhancing user connectivity and automation.",
    icon: <FaLaptopCode size={30} />,
  },
  // Add more experiences as needed
];

const ExperienceCard = () => {
  return (
    <div className="space-y-6">
      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          className="bg-background dark:bg-background-dark p-6 rounded-lg shadow-lg flex"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-accent mr-4">{exp.icon}</div>
          <div>
            <h4 className="text-xl font-semibold text-text-light">{exp.title} at {exp.company}</h4>
            <span className="text-sm text-text-dark">{exp.duration}</span>
            <p className="mt-2 text-text">{exp.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ExperienceCard;
