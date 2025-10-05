import Head from "next/head";
import Navbar from "../components/Navbar";
import Home1 from "../components/Home";
import About from "../components/About";
import Skills from "../components/Skills";
import Achievements from "../components/Achievements";
import Contact from "../components/Contact";
import { NextUIProvider } from "@nextui-org/react";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import AI from "../components/prompt-layout-with-recent-messages/App";
import DotsBackground from "../components/DotsBackground";

export default function Home() {
  return (
    <NextUIProvider>
      <Head>
        <title>
          Rishabh Kumar Choudhary | Founding Engineer at ContraVault AI |
          Portfolio
        </title>
        <meta
          name="description"
          content="Portfolio of Rishabh Kumar Choudhary - Founding Engineer at ContraVault AI specializing in fintech, distributed systems, AWS cloud infrastructure, and full-stack development. Building scalable solutions processing 22k+ daily financial transactions."
        />
        <meta
          name="keywords"
          content="Rishabh Kumar Choudhary, Founding Engineer, ContraVault AI, fintech, AWS, distributed systems, software engineer, full-stack developer, cloud infrastructure, React, TypeScript, Go, Python"
        />
        <meta
          property="og:title"
          content="Rishabh Kumar Choudhary | Founding Engineer at ContraVault AI"
        />
        <meta
          property="og:description"
          content="Founding Engineer at ContraVault AI building enterprise fintech solutions. Expert in AWS cloud services, distributed systems, and modern web technologies."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Rishabh Kumar Choudhary | Founding Engineer at ContraVault AI"
        />
        <meta
          name="twitter:description"
          content="Building scalable fintech infrastructure at ContraVault AI. Expertise in AWS, distributed systems, and full-stack development."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Navbar />
        <Home1 />
        <DotsBackground numberOfDots={50} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <AI />
        <Contact />
      </main>
    </NextUIProvider>
  );
}
