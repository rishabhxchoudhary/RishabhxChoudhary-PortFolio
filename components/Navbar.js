// components/Navbar.jsx
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark mode class to the html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Retrieve theme from localStorage on initial render
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  // Handle link click (close mobile menu)
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-background dark:bg-gray-900 shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-text-light flex items-center">
          {/* Optional: Add a logo icon here */}
          {/* <FaReact className="mr-2" /> */}
          Rishabh
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link href="#about" className="text-text hover:text-accent transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link href="#experience" className="text-text hover:text-accent transition-colors">
              Experience
            </Link>
          </li>
          <li>
            <Link href="#projects" className="text-text hover:text-accent transition-colors">
              Projects
            </Link>
          </li>
          <li>
            <Link href="#skills" className="text-text hover:text-accent transition-colors">
              Skills
            </Link>
          </li>
          <li>
            <Link href="#achievements" className="text-text hover:text-accent transition-colors">
              Achievements
            </Link>
          </li>
          <li>
            <Link href="#contact" className="text-text hover:text-accent transition-colors">
              Contact
            </Link>
          </li>
        </ul>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <button
            // onClick={toggleDarkMode}
            className="text-text-light focus:outline-none focus:ring-2 focus:ring-accent rounded"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-text-light focus:outline-none focus:ring-2 focus:ring-accent rounded"
            aria-label="Toggle Menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="md:hidden bg-background dark:bg-gray-900 px-4 pt-4 pb-6 space-y-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <li>
              <Link href="#about" className="block text-text-light hover:text-accent transition-colors" onClick={handleLinkClick}>
                About
              </Link>
            </li>
            <li>
              <Link href="#experience" className="block text-text-light hover:text-accent transition-colors" onClick={handleLinkClick}>
                Experience
              </Link>
            </li>
            <li>
              <Link href="#projects" className="block text-text-light hover:text-accent transition-colors" onClick={handleLinkClick}>
                Projects
              </Link>
            </li>
            <li>
              <Link href="#skills" className="block text-text-light hover:text-accent transition-colors" onClick={handleLinkClick}>
                Skills
              </Link>
            </li>
            <li>
              <Link href="#achievements" className="block text-text-light hover:text-accent transition-colors" onClick={handleLinkClick}>
                Achievements
              </Link>
            </li>
            <li>
              <Link href="#contact" className="block text-text-light hover:text-accent transition-colors" onClick={handleLinkClick}>
                Contact
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
