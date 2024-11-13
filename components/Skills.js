// components/Skills.js
const skills = {
    Languages: ["Node.js", "Python", "C", "C++", "Solidity", "Rust"],
    Databases: ["MongoDB", "Firebase", "PostgreSQL", "Redis", "MySQL"],
    "Web Technologies": ["React.js", "Next.js", "Express", "jQuery", "Socket.IO", "GraphQL"],
    "Python Frameworks": ["Selenium", "PyAutoGUI", "Pygame", "FastAPI", "Flask", "Django"],
    "Web3 Frameworks": ["Hardhat", "Ethers.js", "OpenZeppelin"],
  };
  
  const Skills = () => {
    return (
      <section id="skills" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">Skills</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, items], index) => (
              <div key={index}>
                <h3 className="text-2xl font-medium mb-2">{category}</h3>
                <ul className="list-disc list-inside">
                  {items.map((skill, idx) => (
                    <li key={idx} className="text-gray-700">{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Skills;
  