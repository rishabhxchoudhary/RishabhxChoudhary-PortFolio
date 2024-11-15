// components/Contact.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
// import { FaLinkedin, FaGithub, FaCode, FaEnvelope, FaYoutube } from 'react-icons/fa';
import axios from 'axios';

import { useForm } from 'react-hook-form';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/mail", data);
      console.log(response);
      setSubmitted(true);
      reset(); // Reset form fields after submission
    } catch (err) {
      console.error(err);
      setError('The email service is currently unavailable, please try again later.');
    }
  };

  return (
    <section id="contact" className="py-20 dark:bg-background bg-gray-800 text-text">
      <div className="container mx-auto px-4 mb-20">
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
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              {error && <p className="text-red-500 text-center">{error}</p>}
              <div>
                <label htmlFor="name" className="block text-gray-300">
                  Name
                </label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  id="name"
                  type="text"
                  className="w-full p-3 mt-1 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                  placeholder="Your Name"
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300">
                  Email
                </label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: 'Invalid email format'
                    }
                  })}
                  id="email"
                  type="email"
                  className="w-full p-3 mt-1 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                  placeholder="Your Email"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="subject" className="block text-gray-300">
                  Subject
                </label>
                <input
                  {...register('subject', {
                    required: 'Subject is required',
                    minLength: {
                      value: 10,
                      message: 'Subject must be at least 10 characters'
                    }
                  })}
                  id="subject"
                  type="text"
                  className="w-full p-3 mt-1 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                  placeholder="Subject"
                />
                {errors.subject && <p className="text-red-500">{errors.subject.message}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-300">
                  Message
                </label>
                <textarea
                  {...register('message', {
                    required: 'Message is required',
                    minLength: {
                      value: 100,
                      message: 'Message must be at least 100 characters'
                    }
                  })}
                  id="message"
                  className="w-full p-3 mt-1 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                  rows="5"
                  placeholder="Your Message"
                ></textarea>
                {errors.message && <p className="text-red-500">{errors.message.message}</p>}
              </div>
              <motion.button
                type="submit"
                className="w-full bg-accent text-background font-semibold py-3 rounded hover:bg-accent-light transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </motion.form>
          )}
        </div>

        {/* <div className="mt-16">
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
              href="https://www.linkedin.com/in/rishabhxchoudhary/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-light transition-colors text-3xl"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/rishabhxchoudhary"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-light transition-colors text-3xl"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.codechef.com/users/rk26072003"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-light transition-colors text-3xl"
              aria-label="CodeChef"
            >
              <FaCode />
            </a>
            <a
              href="https://codeforces.com/profile/rishabh26072003"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-light transition-colors text-3xl"
              aria-label="Codeforces"
            >
              <FaCode />
            </a>
            <a
              href="https://www.youtube.com/@rishabhxchoudhary"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-light transition-colors text-3xl"
              aria-label="Youtube"
            >
              <FaYoutube />
            </a>
          </motion.div>
        </div> */}
      </div>
    </section>
  );
};

export default Contact;
