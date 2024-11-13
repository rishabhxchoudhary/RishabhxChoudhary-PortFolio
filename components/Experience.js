// components/Experience.js
const Experience = () => {
    return (
      <section id="experience" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">Experience</h2>
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold">Software Developer Intern | Blozum.AI</h3>
              <span className="text-gray-600">June 2024 - Present | New Delhi, India</span>
              <ul className="mt-4 list-disc list-inside">
                <li>Developed and deployed WhatsApp bots using RML API, Facebook Graph API, and Google Calendar API for scheduling interviews and interactive sessions.</li>
                <li>Created a LinkedIn automation tool with Selenium and Python, saving the team 30 hours weekly.</li>
                <li>Designed an automated contract template solution, saving over 60 hours monthly.</li>
              </ul>
            </div>
            {/* Add more experiences if applicable */}
          </div>
        </div>
      </section>
    );
  };
  
  export default Experience;
  