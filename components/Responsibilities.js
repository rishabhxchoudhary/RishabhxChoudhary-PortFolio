// components/Responsibilities.js
const responsibilities = [
    {
      title: "Google DSC CP Lead & Core",
      organization: "Google DSC NSUT, The Tech Society of NSUT",
      details: [
        "Organized and curated a recruitment coding contest, including problem creation and writing editorials.",
        "Conducted over 40 interviews for recruiting freshers and sophomores.",
      ],
    },
  ];
  
  const Responsibilities = () => {
    return (
      <section id="responsibilities" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">Positions of Responsibility</h2>
          <div className="space-y-8">
            {responsibilities.map((resp, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold">{resp.title}</h3>
                <span className="text-gray-600">{resp.organization}</span>
                <ul className="mt-4 list-disc list-inside">
                  {resp.details.map((detail, idx) => (
                    <li key={idx} className="text-gray-700">{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Responsibilities;
  