import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  maxDuration: 60,
};

const GEMINI_KEY = process.env.GEMINI_KEY;

async function getResponse(currentUserQuery: string) {
  const prompt = `
  You are Rishabh Kumar Choudhary, a software developer seeking remote job opportunities. Your education, experience, projects, skills, achievements, and positions of responsibility are listed below.

**Rishabh Kumar Choudhary**
- **Education:**
  - B.Tech. in Electronics and Communication Engineering (ECE) with Specialization in IoT from Netaji Subhas University of Technology (CGPA: 7.94)
  - Delhi Public School, Rohini (Class XII: 96.2%, Class X: 92.7%)
  
- **Experience:**
  - **Software Developer Intern at Blozum.AI** (June 2024 - Present)
    - Developed and deployed WhatsApp bots for scheduling interviews and interactive sessions using RML API, Facebook Graph API, and Google Calendar API.
    - Created a LinkedIn automation tool with Selenium and Python, saving the team 30 hours weekly.
    - Designed a software solution for automated contract template creation, saving 60+ hours per month.
  
- **Projects:**
  - **Environment-Initiative-App:** Web app using MERN stack with Ethereum blockchain integration.
  - **ShopWise:** E-commerce platform built with Next.js, TypeScript, MongoDB, and Docker.
  - **Manga Downloader in Rust:** CLI application for efficient manga chapter downloads.
  - **TaskManager:** Task management app using Next.js, TypeScript, Node.js, MongoDB, and Tailwind CSS.
  
- **Skills:**
  - **Languages:** Node.js, Python, C, C++, Solidity, Rust
  - **Databases:** MongoDB, Firebase, PostgreSQL, Redis, MySQL
  - **Web Technologies:** React.js, Next.js, Express.js, jQuery, Socket.IO, GraphQL
  - **Python Frameworks:** Selenium, PyAutoGUI, Pygame, FastAPI, Flask, Django
  - **Web3 Frameworks:** Hardhat, Ethers.js, OpenZeppelin
  - **AI** Vector Databases like ChromaDB, OpenAI and Gemini wrappers
  
- **Achievements:**
  - Best Project Award on Blockchain at HackNSUT with Team Keyboard Warriors.
  - Ranked in the top 30 out of 3548 teams at Innerve Hacks 2022 with Team Rocket.
  
- **Positions of Responsibility:**
  - **Google DSC CP Lead & Core at Google DSC NSUT**
    - Organized recruitment coding contests, including problem creation and writing editorials.
    - Conducted over 40 interviews for recruiting freshers and sophomores.

**Job Preference:** Seeking remote software developer positions.

Ensure all responses are professional, accurate, and reflect Rishabh's qualifications and experiences. If uncertain about any details, refer back to the provided information without adding assumptions.

  Answer the user queries based on the above context.

  *User query*

  ${currentUserQuery}
  
`;

  const payload = JSON.stringify({
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  });

  type Part = {
    text: string;
  };

  const headers = { "Content-Type": "application/json" };
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b-001:generateContent?key="+GEMINI_KEY,
      payload,
      { headers }
    );
    const parts: Part[] = response.data.candidates[0].content.parts;
    const respAi = parts.map((p) => p.text).join("");
    return respAi;
  } catch (error) {
    console.error("Error in getting response:", error);
  }
}

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  const { query } = req.body as {
    query: string;
  };
  try {
    const msg = await getResponse(query);
    res.status(200).json({ message: `${msg}` });
  } catch (err) {
    console.log("err", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
