import Head from 'next/head';
import Navbar from '../components/Navbar';
import Home1 from '../components/Home';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Achievements from '../components/Achievements';
import Responsibilities from '../components/Responsibilities';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Head>
        <title>Rishabh Kumar Choudhary | Portfolio</title>
        <meta name="description" content="Portfolio of Rishabh Kumar Choudhary - Software Developer & IoT Specialist" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Add more SEO tags as needed */}
      </Head>
      <Navbar />
      <main className="pt-20">
        <Home1 />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Responsibilities />
        <Contact />
      </main>
    </>
  );
}
