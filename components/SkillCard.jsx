// components/SkillCard.jsx
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaIoT, FaDatabase } from "react-icons/fa";

const skills = [
  { name: "React", icon: <FaReact size={30} />, level: 90 },
  { name: "Node.js", icon: <FaNodeJs size={30} />, level: 85 },
  { name: "IoT Solutions", icon: <FaIoT size={30} />, level: 80 },
  { name: "Database Management", icon: <FaDatabase size={30} />, level: 75 },
  // Add more skills as needed
];

const SkillCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {skills.map((skill, index) => (
        <motion.div
          key={index}
          className="bg-background dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          {/* <div className="text-accent mb-4">{skill.icon}</div> */}
          <h4 className="text-xl font-semibold mb-2 text-text-light">{skill.name}</h4>
          <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
            <div
              className="bg-accent h-2.5 rounded-full"
              style={{ width: `${skill.level}%` }}
            ></div>
          </div>
          <span className="text-sm text-text-dark">{skill.level}%</span>
        </motion.div>
      ))}
    </div>
  );
};

export default SkillCard;
