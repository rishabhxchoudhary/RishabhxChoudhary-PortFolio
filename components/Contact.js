// components/Contact.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaCode, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Handle form submission (e.g., send email via API)
    // Replace the below with actual form submission logic
    console.log(formData);
    // Simulate form submission delay
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <section id="contact" className="py-20 dark:bg-background bg-gray-800 text-text">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-semibold mb-12 text-text-light text-center"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-4xl font-semibold mb-6 text-text-light text-center">Contact</span>
        </motion.h2>

        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <motion.p
              className="text-green-500 text-center text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Thank you for your message! I will get back to you soon.
            </motion.p>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div>
                <label htmlFor="name" className="block text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 mt-1 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 mt-1 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-gray-300">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full p-3 mt-1 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Subject"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full p-3 mt-1 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your Message"
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full bg-accent text-background font-semibold py-3 rounded hover:bg-accent-light transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </motion.button>
            </motion.form>
          )}
        </div>

        <div className="mt-16">
          <motion.h3
            className="text-2xl font-bold mb-6 text-text-light text-center flex items-center justify-center space-x-2"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <FaEnvelope />
            <span>Connect with Me</span>
          </motion.h3>
          <motion.div
            className="flex justify-center space-x-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <a
              href="https://linkedin.com/in/yourlinkedin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-light transition-colors text-3xl"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/yourgithub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-light transition-colors text-3xl"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://codechef.com/users/yourcodechef"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-light transition-colors text-3xl"
              aria-label="CodeChef"
            >
              <FaCode />
            </a>
            <a
              href="https://codeforces.com/profile/yourcodeforces"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-light transition-colors text-3xl"
              aria-label="Codeforces"
            >
              <FaCode />
            </a>
            {/* Add more social links with appropriate icons as needed */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
