import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaBook } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import Image from "next/image";
import { useState } from "react";
import { useProjects } from "../hooks/useProjects";
import ReadmeModal from "./ReadmeModal";

const Projects = () => {
  const { projects, loading, error, refetch } = useProjects();
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  if (loading) {
    return (
      <section
        id="projects"
        className="relative min-h-screen flex flex-col justify-center bg-background text-text py-20 overflow-hidden"
      >
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.h2
            className="text-4xl font-semibold mb-12 text-text-light text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            My Projects
          </motion.h2>
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            <p className="ml-4 text-text">Loading projects from GitHub...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="projects"
        className="relative min-h-screen flex flex-col justify-center bg-background text-text py-20 overflow-hidden"
      >
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.h2
            className="text-4xl font-semibold mb-12 text-text-light text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            My Projects
          </motion.h2>
          <div className="text-center">
            <p className="text-red-500 mb-4">Error loading projects: {error}</p>
            <button
              onClick={refetch}
              className="flex items-center mx-auto px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-dark transition-colors"
            >
              <FaArrowsRotate className="mr-2" />
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
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
          <div className="absolute top-10 left-10 w-4 h-4 bg-accent rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-6 h-6 bg-primary rounded-full animate-ping"></div>
          <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-secondary rounded-full opacity-50 animate-bounce"></div>
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
            <span className="block text-sm text-gray-400 mt-2 font-normal">
              Click on any project card to read the full README
            </span>
          </motion.h2>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="bg-background dark:bg-background-dark p-6 rounded-lg shadow-lg flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-accent/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                onClick={() => openModal(project)}
              >
                <div className="img-scale">
                  {/* Project Image */}
                  {project.image && (
                    <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        style={{ objectFit: "cover" }}
                        className="rounded-md"
                        width={500}
                        height={600}
                      />
                    </div>
                  )}

                  {/* Project Title */}
                  <h3 className="text-2xl font-bold mb-2 text-text-light flex items-center">
                    {project.title}
                    {project.readmeContent && (
                      <FaBook
                        className="ml-2 text-accent text-lg"
                        title="Has README"
                      />
                    )}
                  </h3>

                  {/* Technologies */}
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies
                        .slice(0, 5)
                        .map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-md border border-accent/20"
                          >
                            {tech}
                          </span>
                        ))}
                      {project.technologies.length > 5 && (
                        <span className="px-2 py-1 text-xs bg-gray-500/10 text-gray-500 rounded-md border border-gray-500/20">
                          +{project.technologies.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description Preview */}
                  <p className="text-text mb-4 flex-grow text-sm leading-relaxed line-clamp-4">
                    {project.readmePreview || project.description}
                  </p>

                  {/* Click to read more indicator */}
                  <div className="text-center py-2 px-3 bg-accent/5 rounded-md border border-accent/20 mb-4 hover:bg-accent/10 transition-colors">
                    <p className="text-xs text-accent font-medium">
                      {project.readmeContent
                        ? "Click to read full README"
                        : "Click for more details"}
                    </p>
                  </div>

                  {/* Project Links */}
                  <div className="mt-auto flex space-x-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-accent hover:text-highlight transition-colors"
                      title="View GitHub Repository"
                      onClick={(e) => e.stopPropagation()} // Prevent modal opening
                    >
                      <FaGithub className="mr-1" />
                      GitHub
                    </a>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-accent hover:text-highlight transition-colors"
                        title="View Live Project"
                        onClick={(e) => e.stopPropagation()} // Prevent modal opening
                      >
                        <FaExternalLinkAlt className="mr-1" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center text-gray-400">
              <p>
                No projects found. Check your GitHub repositories or
                configuration.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* README Modal */}
      <ReadmeModal project={selectedProject} onClose={closeModal} />
    </>
  );
};

export default Projects;
