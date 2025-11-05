import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useEffect } from "react";

import Image from "next/image";

interface Project {
  title: string;
  technologies: string[];
  description: string;
  readmeContent?: string;
  readmePreview: string;
  link?: string;
  github: string;
  image?: string;
}

interface ReadmeModalProps {
  project: Project | null;
  onClose: () => void;
}

const ReadmeModal = ({ project, onClose }: ReadmeModalProps) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (project) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h2>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md border border-blue-200 dark:border-blue-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    <FaGithub className="mr-2" />
                    GitHub
                  </a>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                    >
                      <FaExternalLinkAlt className="mr-2" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="ml-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Close modal"
              >
                <FaTimes size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
            <div className="p-6">
              {project.readmeContent ? (
                <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      // Custom link component to open in new tab
                      a: ({ href, children, ...props }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors underline"
                          {...props}
                        >
                          {children}
                        </a>
                      ),
                      // Custom code block styling
                      code: ({ className, children, ...props }) => {
                        const inline = !className;
                        if (inline) {
                          return (
                            <code
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 rounded text-sm font-mono"
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        }
                        return (
                          <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto border border-gray-200 dark:border-gray-700">
                            <code
                              className={`${className} text-sm font-mono`}
                              {...props}
                            >
                              {children}
                            </code>
                          </pre>
                        );
                      },
                      // Custom image styling
                      img: ({ src, alt }) => (
                        <Image
                          src={src || ""}
                          alt={alt || ""}
                          width={800}
                          height={600}
                          className="rounded-lg shadow-md max-w-full h-auto border border-gray-200 dark:border-gray-700"
                          style={{ objectFit: "contain" }}
                        />
                      ),
                      // Custom blockquote styling
                      blockquote: ({ children, ...props }) => (
                        <blockquote
                          className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r-lg my-4"
                          {...props}
                        >
                          {children}
                        </blockquote>
                      ),
                      // Custom table styling
                      table: ({ children, ...props }) => (
                        <div className="overflow-x-auto">
                          <table
                            className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg"
                            {...props}
                          >
                            {children}
                          </table>
                        </div>
                      ),
                      th: ({ children, ...props }) => (
                        <th
                          className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-left font-semibold"
                          {...props}
                        >
                          {children}
                        </th>
                      ),
                      td: ({ children, ...props }) => (
                        <td
                          className="px-4 py-2 border-b border-gray-200 dark:border-gray-700"
                          {...props}
                        >
                          {children}
                        </td>
                      ),
                    }}
                  >
                    {project.readmeContent}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <p className="text-lg mb-2">
                    No README content available for this project.
                  </p>
                  <p className="text-sm">{project.description}</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ReadmeModal;
