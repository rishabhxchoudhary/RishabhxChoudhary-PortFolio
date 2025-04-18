// components/About.jsx
import { motion } from "framer-motion";
import ProfileImage from "./ProfileImage";
import { FaGraduationCap, FaYoutube } from "react-icons/fa";

// FaGlobe, FaRobot, FaDatabase

const education = [
  {
    institution: "Netaji Subhas University of Technology",
    degree: "B.Tech in Electronics and Communication Engineering",
    specialization: "Specialization in IoT",
    cgpa: "7.94",
    icon: <FaGraduationCap size={24} color="#FBBF24" />,
  },
  {
    institution: "Delhi Public School, Rohini",
    degree: "Class XII",
    percentage: "96.2%",
    icon: <FaGraduationCap size={24} color="#FBBF24" />,
  },
  {
    institution: "Delhi Public School, Rohini",
    degree: "Class X",
    percentage: "92.7%",
    icon: <FaGraduationCap size={24} color="#FBBF24" />,
  },
];

const About = () => {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center  bg-background text-text py-20">
      <div className="container mx-auto px-4 flex flex-col justify-center lg:flex-row items-center">
        {/* Profile Image */}
        <motion.div
          className="lg:w-1/3 justify-center items-center mb-12 lg:mb-0"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <ProfileImage />
        </motion.div>

        {/* About Content */}
        <motion.div
          className="lg:w-2/3"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <h2 className="text-4xl font-semibold mb-6 text-text-light">About Me</h2>

          {/* Introduction */}
          <motion.p
            className="text-lg md:text-xl mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            I am a passionate B.Tech graduate in Electronics and Communication Engineering with a specialization in IoT from Netaji Subhas University of Technology. I have hands-on experience in developing software solutions, automating workflows, web3 and creating innovative web applications.
          </motion.p>

          {/* Educational Background */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-4 text-text-light flex items-center space-x-2">
              <FaGraduationCap /> <span>Educational Background</span>
            </h3>
            <ul className="space-y-4">
              {education.map((edu, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Icon */}
                  <div className="mr-4 mt-1">{edu.icon}</div>
                  {/* Education Details */}
                  <div>
                    <h4 className="text-xl font-semibold text-text-light">{edu.degree}</h4>
                    <p className="text-gray-400">{edu.institution}</p>
                    {edu.specialization && <p className="text-gray-400">Specialization: {edu.specialization}</p>}
                    {edu.cgpa && <p className="text-gray-400">CGPA: {edu.cgpa}</p>}
                    {edu.percentage && <p className="text-gray-400">Percentage: {edu.percentage}</p>}
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* YouTube Channel */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-4 text-text-light flex items-center space-x-2">
              <FaYoutube /> <span>My YouTube Channel</span>
            </h3>
            <motion.p
              className="text-lg md:text-xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
            >
              I run a YouTube channel called <a href="https://www.youtube.com/@rishabhxchoudhary" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Codenzyme</a>, where I post regular content about competitive programming and development. Join me to enhance your coding skills and stay updated with the latest in technology!
            </motion.p>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
};

export default About;
