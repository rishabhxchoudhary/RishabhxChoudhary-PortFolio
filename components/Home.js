import Link from "next/link";

const Home = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center p-4">
      <h1 className="text-4xl font-bold mb-4">Rishabh Kumar Choudhary</h1>
      <p className="text-xl mb-6">Software Developer & IoT Specialist</p>
      <div className="flex space-x-4">
        <Link href="mailto:rishabh.choudhary.ug21@nsut.ac.in" className="text-blue-500 hover:underline">Email</Link>
        <Link href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">LinkedIn</Link>
        <Link href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub</Link>
        {/* Add more links as needed */}
      </div>
      <p className="mt-6 text-gray-600">Passionate about developing innovative IoT solutions and automating workflows to enhance productivity.</p>
    </section>
  );
};

export default Home;
