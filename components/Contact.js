// components/Contact.js
import Link from 'next/link';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send email via API)
    console.log(formData);
    setSubmitted(true);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6">Contact</h2>
        {submitted ? (
          <p className="text-green-500">Thank you for your message! I will get back to you soon.</p>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Subject</label>
              <input
                type="text"
                name="subject"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Message</label>
              <textarea
                name="message"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Send Message
            </button>
          </form>
        )}
        <div className="mt-8 flex justify-center space-x-4">
          <Link href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">LinkedIn</Link>
          <Link href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub</Link>
          <Link href="https://codechef.com/users/yourcodechef" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">CodeChef</Link>
          <Link href="https://codeforces.com/profile/yourcodeforces" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Codeforces</Link>
          {/* Add more social links as needed */}
        </div>
      </div>
    </section>
  );
};

export default Contact;
