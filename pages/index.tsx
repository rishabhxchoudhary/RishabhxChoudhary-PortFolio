import Head from 'next/head';
import Navbar from '../components/Navbar';
import Home1 from '../components/Home';
import About from '../components/About';
import Skills from '../components/Skills';
import Achievements from '../components/Achievements';
import Contact from '../components/Contact';
import {NextUIProvider} from "@nextui-org/react";
import Projects from '../components/Projects'
import Experience from '../components/Experience'


export default function Home() {
  return (
    <NextUIProvider>
      <Head>
        <title>Rishabh Kumar Choudhary | Portfolio</title>
        <meta name="description" content="Portfolio of Rishabh Kumar Choudhary - Software Developer & IoT Specialist" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Add more SEO tags as needed */}
      </Head>
      <Navbar />
      <main>
        <Home1 />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
    </NextUIProvider>
  );
}
