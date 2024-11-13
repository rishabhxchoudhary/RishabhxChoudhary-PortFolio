import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
// import ReactTooltip from "react-tooltip";
import Image from "next/image";

const projects = [
  {
    title: "Environment-Initiative-App",
    technologies: ["MongoDB", "Express.js", "React.js", "Node.js"],
    description:
      "Developed a web application to support environmental initiatives with blockchain-based Ethereum donations and transaction recording.",
    link: "https://github.com/yourgithub/environment-initiative-app",
    image: "/images/environment-app.png", // Add your image path
  },
  {
    title: "ShopWise",
    technologies: ["TypeScript", "Next.js", "MongoDB", "Docker"],
    description:
      "Created an e-commerce platform with efficient deployment processes, reducing deployment time by 40%.",
    link: "https://github.com/yourgithub/shopwise",
    image: "/images/shopwise.png", // Add your image path
  },
  {
    title: "Manga Downloader in Rust",
    technologies: ["Rust", "CLI"],
    description:
      "Built a CLI tool for downloading manga chapters swiftly using asynchronous programming and concurrency.",
    link: "https://github.com/yourgithub/manga-downloader",
    image: "/images/manga-downloader.png", // Add your image path
  },
  {
    title: "TaskManager",
    technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"],
    description:
      "Developed a task management app that improved personal productivity by 20%.",
    link: "https://github.com/yourgithub/taskmanager",
    image: "/images/taskmanager.png", // Add your image path
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
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
          My Projects
        </motion.h2>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-background dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col transform transition-transform duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Project Image */}
              {project.image && (
                <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              )}

              {/* Project Title */}
              <h3 className="text-2xl font-bold mb-2 text-text-light">{project.title}</h3>

              {/* Technologies */}
              <p className="text-gray-400 mb-2">
                <strong>Technologies:</strong> {project.technologies.join(", ")}
              </p>

              {/* Description */}
              <p className="text-text mb-4">{project.description}</p>

              {/* Project Links */}
              <div className="mt-auto flex space-x-4">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-accent hover:text-highlight transition-colors"
                  data-tip="View GitHub Repository"
                  data-for={`github-${index}`}
                >
                  <FaGithub className="mr-1" />
                  GitHub
                  {/* <ReactTooltip id={`github-${index}`} place="top" effect="solid" /> */}
                </a>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-accent hover:text-highlight transition-colors"
                  data-tip="View Live Project"
                  data-for={`live-${index}`}
                >
                  <FaExternalLinkAlt className="mr-1" />
                  View Project
                  {/* <ReactTooltip id={`live-${index}`} place="top" effect="solid" /> */}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
