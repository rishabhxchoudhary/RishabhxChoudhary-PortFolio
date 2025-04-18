// components/Achievements.jsx
import { motion } from "framer-motion";
import { FaAward } from "react-icons/fa";
// import Image from "next/image";

// FaCertificate

const achievements = [
  {
    title: "Best Project Award on Blockchain at HackNSUT",
    team: "Team Keyboard Warriors",
    icon: <FaAward size={20} color="#FBBF24" />,
  },
  {
    title: "Top 30 Ranking at Innerve Hacks 2022",
    team: "Team Rocket out of 3548 teams",
    icon: <FaAward size={20} color="#FBBF24" />,
  },
  // Add more achievements as needed
];

// const certifications = [
//   {
//     title: "Certified Blockchain Developer",
//     issuer: "Blockchain Council",
//     date: "March 2023",
//     image: "/certificates/blockchain-developer.png", // Add your certificate image path
//     link: "https://www.blockchain-council.org/certifications/blockchain-developer/",
//   },
//   {
//     title: "AWS Certified Solutions Architect",
//     issuer: "Amazon Web Services",
//     date: "July 2022",
//     image: "/certificates/aws-solutions-architect.png",
//     link: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
//   },
//   {
//     title: "Full Stack Web Development",
//     issuer: "Coursera",
//     date: "December 2021",
//     image: "/certificates/full-stack-web-development.png",
//     link: "https://www.coursera.org/account/accomplishments/specialization/certificate-id",
//   },
// ];

const Achievements = () => {
  return (
    <section
      id="achievements"
      className="relative min-h-screen flex flex-col justify-center bg-background text-text py-20 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-10 left-10 w-4 h-4 bg-accent rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-6 h-6 bg-primary rounded-full animate-ping"></div>
        {/* <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-secondary rounded-full opacity-50 animate-bounce"></div> */}
      </motion.div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.h2
          className="text-4xl font-semibold mb-12 text-text-light text-center"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Achievements & Certifications
        </motion.h2>

        {/* Achievements Section */}
        <div className="mb-16">
          <motion.h3
            className="text-2xl font-bold mb-6 text-text-light text-center flex items-center justify-center space-x-2"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <FaAward />
            <span>Achievements</span>
          </motion.h3>
          <div className="space-y-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Icon */}
                <div className="mr-4 mt-1">{achievement.icon}</div>
                {/* Content */}
                <div>
                  <h4 className="text-xl font-semibold text-text-light">
                    {achievement.title}
                  </h4>
                  <p className="text-gray-400">{achievement.team}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* <div>
          <motion.h3
            className="text-2xl font-bold mb-6 text-text-light text-center flex items-center justify-center space-x-2"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <FaCertificate />
            <span>Certifications</span>
          </motion.h3>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {certifications.map((cert, index) => (
              <motion.a
                key={index}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background dark:bg-background-dark p-4 rounded-lg shadow-lg flex flex-col items-center hover:shadow-3xl transition-shadow duration-300 max-w-xs mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative w-full h-32 mb-4">
                  <Image
                    src={cert.image}
                    alt={`${cert.title} Certificate`}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-md"
                  />
                </div>
                <h4 className="text-lg font-semibold text-text-light text-center mb-1">
                  {cert.title}
                </h4>
                <p className="text-gray-400 text-sm text-center">
                  {cert.issuer} | {cert.date}
                </p>
              </motion.a>
            ))}
          </motion.div>
        </div> */}
      </div>
    </section>
  );
};

export default Achievements;
