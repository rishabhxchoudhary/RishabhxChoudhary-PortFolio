// components/Achievements.js
const achievements = [
    {
      title: "Best Project Award on Blockchain at HackNSUT",
      team: "Team Keyboard Warriors",
    },
    {
      title: "Top 30 Ranking at Innerve Hacks 2022",
      team: "Team Rocket out of 3548 teams",
    },
  ];
  
  const Achievements = () => {
    return (
      <section id="achievements" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">Achievements</h2>
          <div className="space-y-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center">
                <svg className="w-6 h-6 text-yellow-500 mr-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.962a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.376 2.454a1 1 0 00-.364 1.118l1.286 3.962c.3.921-.755 1.688-1.54 1.118l-3.376-2.454a1 1 0 00-1.175 0l-3.376 2.454c-.784.57-1.838-.197-1.54-1.118l1.286-3.962a1 1 0 00-.364-1.118L2.683 9.389c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.962z" />
                </svg>
                <div>
                  <h3 className="text-xl font-bold">{achievement.title}</h3>
                  <p className="text-gray-600">{achievement.team}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Achievements;
  