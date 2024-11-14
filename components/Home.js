// components/Home.jsx
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope, FaDownload } from "react-icons/fa";
import useScrollPosition from '../hooks/useScrollPosition';

const Home = () => {
  const scrollY = useScrollPosition();
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center bg-background text-text p-4 sm:p-6 relative overflow-hidden">
      {/* Animated Background Circles with Parallax */}
      <motion.div
        className="absolute top-0 left-0 w-32 sm:w-48 h-32 sm:h-48 bg-primary opacity-30 rounded-full filter blur-3xl"
        style={{ transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.2}px)` }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-32 sm:w-48 h-32 sm:h-48 bg-secondary opacity-30 rounded-full filter blur-3xl"
        style={{ transform: `translate(-${scrollY * 0.1}px, -${scrollY * 0.2}px)` }}
      />

      {/* Main Content */}
      <motion.div
        className="flex flex-col items-center z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-text-light mb-3 sm:mb-4 text-center">
          Rishabh Kumar Choudhary
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-text-dark mb-6 sm:mb-8 text-center">
          Software Developer &amp; IoT Specialist
        </p>
        
        {/* Social & Contact Buttons */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-6 sm:mb-8">
          <a
            href="mailto:rishabh26072003@gmail.com"
            className="flex items-center justify-center space-x-2 bg-accent text-background px-4 py-2 rounded-full shadow-lg hover:bg-accent-light transition"
          >
            <FaEnvelope size={20} />
            <span className="inline">Email</span>
          </a>
          <a
            href="https://www.linkedin.com/in/rishabhxchoudhary/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-[#0077B5] text-background px-4 py-2 rounded-full shadow-lg hover:bg-primary-light transition"
          >
            <FaLinkedin size={20} />
            <span className="inline">LinkedIn</span>
          </a>
          <a
            href="https://github.com/rishabhxchoudhary"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-secondary text-background px-4 py-2 rounded-full shadow-lg hover:bg-secondary-light transition"
          >
            <FaGithub size={20} />
            <span className="inline">GitHub</span>
          </a>
          <a
            href="/resume.pdf" // Adjust the path if your resume is hosted online
            download="RishabhKumarChoudhary_Resume.pdf" // This attribute will prompt the file to be downloaded with this filename
            className="flex items-center justify-center space-x-2 bg-accent text-background px-4 py-2 rounded-full shadow-lg hover:bg-accent-light transition"
          >
            <FaDownload size={20} />
            <span className="inline">Download Resume</span>
          </a>
        </div>
        
        {/* Description */}
        <motion.p
          className="text-base sm:text-lg md:text-xl max-w-md sm:max-w-2xl text-center text-text-dark mb-6 sm:mb-8 px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Passionate about developing innovative IoT solutions and automating workflows to enhance productivity.
        </motion.p>
        
        {/* Call to Action Button */}
        <motion.button
          className="mt-4 px-5 sm:px-6 py-2 sm:py-3 bg-accent text-background rounded-full shadow-lg hover:bg-accent-light transition text-sm sm:text-base"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        >
          Explore My Work
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Home;
