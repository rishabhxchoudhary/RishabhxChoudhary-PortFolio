import Link from "next/link";

// components/Projects.js
const projects = [
    {
      title: "Environment-Initiative-App",
      technologies: "MongoDB, Express.js, React.js, Node.js",
      description: "Developed a web application to support environmental initiatives with blockchain-based Ethereum donations and transaction recording.",
      link: "https://github.com/yourgithub/environment-initiative-app",
    },
    {
      title: "ShopWise",
      technologies: "TypeScript, Next.js, MongoDB, Docker",
      description: "Created an e-commerce platform with efficient deployment processes, reducing deployment time by 40%.",
      link: "https://github.com/yourgithub/shopwise",
    },
    {
      title: "Manga Downloader in Rust",
      technologies: "Rust, CLI",
      description: "Built a CLI tool for downloading manga chapters swiftly using asynchronous programming and concurrency.",
      link: "https://github.com/yourgithub/manga-downloader",
    },
    {
      title: "TaskManager",
      technologies: "Next.js, TypeScript, Node.js, MongoDB, Tailwind CSS",
      description: "Developed a task management app that improved personal productivity by 20%.",
      link: "https://github.com/yourgithub/taskmanager",
    },
  ];
  
  const Projects = () => {
    return (
      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-2"><strong>Technologies:</strong> {project.technologies}</p>
                <p className="mb-4">{project.description}</p>
                <Link href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  View Project
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Projects;
  