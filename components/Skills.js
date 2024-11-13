import { motion } from "framer-motion";
import { FaCode, FaDatabase, FaGlobe } from "react-icons/fa";
// import ReactTooltip from 'react-tooltip';

const skills = {
  Languages: [
    { name: "Node.js", level: 90 },
    { name: "Python", level: 95 },
    { name: "C", level: 80 },
    { name: "C++", level: 85 },
    { name: "Solidity", level: 70 },
    { name: "Rust", level: 60 },
  ],
  Databases: [
    { name: "MongoDB", level: 90 },
    { name: "Firebase", level: 85 },
    { name: "PostgreSQL", level: 80 },
    { name: "Redis", level: 75 },
    { name: "MySQL", level: 70 },
  ],
  "Web Technologies": [
    { name: "React.js", level: 95 },
    { name: "Next.js", level: 90 },
    { name: "Express", level: 85 },
    { name: "jQuery", level: 80 },
    { name: "Socket.IO", level: 75 },
    { name: "GraphQL", level: 70 },
  ],
  "Python Frameworks": [
    { name: "Selenium", level: 85 },
    { name: "PyAutoGUI", level: 80 },
    { name: "Pygame", level: 75 },
    { name: "FastAPI", level: 70 },
    { name: "Flask", level: 65 },
    { name: "Django", level: 60 },
  ],
  "Web3 Frameworks": [
    { name: "Hardhat", level: 80 },
    { name: "Ethers.js", level: 75 },
    { name: "OpenZeppelin", level: 70 },
  ],
};

const categoryIcons = {
  Languages: <FaCode size={30} />,
  Databases: <FaDatabase size={30} />,
  "Web Technologies": <FaGlobe size={30} />,
  "Python Frameworks": <FaCode size={30} />,
  "Web3 Frameworks": <FaGlobe size={30} />,
};

const Skills = () => {
  return (
    <section id="skills" className="relative min-h-screen flex flex-col justify-center bg-background text-text py-20 overflow-hidden">
      
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
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-4xl font-semibold mb-12 text-text-light text-center"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          My Skills
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, items], index) => (
            <motion.div
              key={index}
              className="bg-background dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center transform transition-transform duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-accent mb-4">
                {categoryIcons[category] || <FaCode size={30} />}
              </div>

              <h3 className="text-2xl font-medium mb-4 text-text-light text-center">{category}</h3>

              <ul className="w-full">
                {items.map((skill, idx) => (
                  <li
                    key={idx}
                    className="mb-4"
                    data-tip={`Proficiency: ${skill.level}%`}
                    data-for={`skill-${index}-${idx}`}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-text-light">{skill.name}</span>
                      <span className="text-text-dark">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <motion.div
                        className="bg-accent h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                    {/* <ReactTooltip id={`skill-${index}-${idx}`} place="top" effect="solid" /> */}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
