// components/Home.jsx
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const Home = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-background text-text p-6 relative overflow-hidden">
      
      <motion.div
        className="absolute top-0 left-0 w-48 h-48 bg-primary opacity-30 rounded-full filter blur-3xl"
        animate={{ y: [0, 50, 0], x: [0, 50, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-48 h-48 bg-secondary opacity-30 rounded-full filter blur-3xl"
        animate={{ y: [0, -50, 0], x: [0, -50, 0] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      />

      <motion.div
        className="flex flex-col items-center z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-text-light mb-4">
          Rishabh Kumar Choudhary
        </h1>
        <p className="text-2xl md:text-3xl text-text-dark mb-8">
          Software Developer &amp; IoT Specialist
        </p>
        
        <div className="flex space-x-6 mb-8">
          <a
            href="mailto:rishabh26072003@gmail.com"
            className="flex items-center space-x-2 bg-accent text-background px-4 py-2 rounded-full shadow-lg hover:bg-accent-light transition"
          >
            <FaEnvelope size={20} />
            <span>Email</span>
          </a>
          <a
            href="https://www.linkedin.com/in/rishabhxchoudhary/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-primary text-background px-4 py-2 rounded-full shadow-lg hover:bg-primary-light transition"
          >
            <FaLinkedin size={20} />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/rishabhxchoudhary"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-secondary text-background px-4 py-2 rounded-full shadow-lg hover:bg-secondary-light transition"
          >
            <FaGithub size={20} />
            <span>GitHub</span>
          </a>
        </div>
        
        <motion.p
          className="text-lg md:text-xl max-w-2xl text-center text-text-dark mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Passionate about developing innovative IoT solutions and automating workflows to enhance productivity.
        </motion.p>
        
        <motion.button
          className="mt-4 px-6 py-3 bg-accent text-background rounded-full shadow-lg hover:bg-accent-light transition"
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
