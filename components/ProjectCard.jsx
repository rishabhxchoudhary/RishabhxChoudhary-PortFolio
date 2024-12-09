// components/ProjectCard.jsx
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const projects = [
  {
    name: "IoT Home Automation",
    description: "Developed a comprehensive home automation system using IoT devices to control lighting, temperature, and security.",
    technologies: ["Arduino", "Raspberry Pi", "React", "Node.js"],
    liveLink: "https://github.com/yourgithub/iot-home-automation",
    repoLink: "https://github.com/yourgithub/iot-home-automation",
    icon: <FaExternalLinkAlt size={20} />,
  },
  {
    name: "E-commerce Platform",
    description: "Built a full-stack e-commerce application with features like product listings, shopping cart, and secure checkout.",
    technologies: ["Next.js", "Tailwind CSS", "Stripe API"],
    liveLink: "https://yourportfolio.com/e-commerce",
    repoLink: "https://github.com/yourgithub/e-commerce",
    icon: <FaExternalLinkAlt size={20} />,
  },
  // Add more projects as needed
];

const ProjectCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          className="bg-background dark:bg-background-dark p-6 rounded-lg shadow-lg flex flex-col"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          <h4 className="text-xl font-semibold text-text-light mb-2">{project.name}</h4>
          <p className="text-text mb-4">{project.description}</p>
          <div className="mb-4">
            <span className="text-sm font-medium text-accent">Technologies:</span>
            <ul className="list-disc list-inside text-text">
              {project.technologies.map((tech, idx) => (
                <li key={idx}>{tech}</li>
              ))}
            </ul>
          </div>
          <div className="mt-auto flex space-x-4">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-accent hover:text-highlight transition"
            >
              <FaExternalLinkAlt className="mr-1" />
              Live Demo
            </a>
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-accent hover:text-highlight transition"
            >
              <FaGithub className="mr-1" />
              GitHub
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectCard;
