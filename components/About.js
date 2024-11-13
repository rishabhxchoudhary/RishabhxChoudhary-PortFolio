// components/About.js
const About = () => {
    return (
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">About Me</h2>
          <p className="mb-4">
            I am a B.Tech graduate in Electronics and Communication Engineering with a specialization in IoT from Netaji Subhas University of Technology. I have hands-on experience in developing software solutions, automating workflows, and creating innovative web applications.
          </p>
          <h3 className="text-2xl font-medium mt-6 mb-3">Education</h3>
          <ul className="list-disc list-inside">
            <li><strong>Netaji Subhas University of Technology</strong> - B.Tech in ECE with Specialization in IoT (CGPA: 7.94)</li>
            <li><strong>Delhi Public School, Rohini</strong> - Class XII (96.2%)</li>
            <li><strong>Delhi Public School, Rohini</strong> - Class X (92.7%)</li>
          </ul>
        </div>
      </section>
    );
  };
  
  export default About;
  