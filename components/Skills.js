import { motion } from "framer-motion";
import { FaCode, FaDatabase, FaGlobe } from "react-icons/fa";
// You can uncomment and use ReactTooltip if you decide to add tooltips later
// import ReactTooltip from 'react-tooltip';

const skills = {
  "Programming Languages": [
    "Java",
    "Spring Boot",
    "Go",
    "C++",
    "Python",
    "TypeScript",
    "JavaScript",
    "LaTeX",
  ],
  "Backend & APIs": [
    "Node.js",
    "Express",
    "FastAPI",
    "Flask",
    "Django",
    "REST APIs",
    "SSE Streaming",
    "SQS",
    "Distributed Systems",
  ],
  "Databases & Search": [
    "DynamoDB",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Firebase",
    "Redis",
    "OpenSearch",
    "Elasticsearch",
    "ChromaDB",
    "pgvector",
    "Qdrant",
    "AWS DocumentDB",
  ],
  "Cloud & DevOps": [
    "AWS ECS",
    "AWS Lambda",
    "Step Functions",
    "AWS IAM",
    "AWS S3",
    "CloudWatch",
    "Docker",
    "Kubernetes",
    "Nginx",
    "Linux",
    "CI/CD",
  ],
  Frontend: [
    "React.js",
    "Next.js",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Socket.IO",
    "jQuery",
  ],
  "Testing & Quality": [
    "Jest",
    "Pytest",
    "Unit Testing",
    "Integration Testing",
    "Type Safety",
    "Code Reviews",
  ],
};

const categoryIcons = {
  "Programming Languages": <FaCode size={30} />,
  "Backend & APIs": <FaGlobe size={30} />,
  "Databases & Search": <FaDatabase size={30} />,
  "Cloud & DevOps": <FaGlobe size={30} />,
  Frontend: <FaCode size={30} />,
  "Testing & Quality": <FaCode size={30} />,
};

const Skills = () => {
  return (
    <section
      id="skills"
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

      {/* Content Container */}
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Section Title */}
        <motion.h2
          className="text-4xl font-semibold mb-12 text-text-light text-center"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          My Skills
        </motion.h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, items], index) => (
            <motion.div
              key={index}
              className="bg-background dark:bg-background-dark p-6 rounded-lg shadow-lg flex flex-col items-center transition-transform duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Category Icon */}
              <div className="text-accent mb-4">
                {categoryIcons[category] || <FaCode size={30} />}
              </div>

              {/* Category Title */}
              <h3 className="text-2xl font-medium mb-4 text-text-light text-center">
                {category}
              </h3>

              {/* Skills List */}
              <ul className="w-full space-y-2">
                {items.map((skill, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-center px-2 py-1 rounded hover:bg-gray-700 transition-colors duration-200"
                    // Uncomment the following lines if you decide to add tooltips
                    // data-tip={`Learn more about ${skill}`}
                    // data-for={`skill-${index}-${idx}`}
                  >
                    <span className="text-text-light">{skill}</span>
                  </li>
                ))}
              </ul>

              {/* Uncomment if using ReactTooltip
              {items.map((skill, idx) => (
                <ReactTooltip
                  key={`tooltip-${index}-${idx}`}
                  id={`skill-${index}-${idx}`}
                  place="top"
                  effect="solid"
                />
              ))}
              */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
