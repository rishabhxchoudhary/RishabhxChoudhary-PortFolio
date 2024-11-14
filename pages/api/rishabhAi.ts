import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const GEMINI_KEY = process.env.GEMINI_KEY;

async function getResponse(currentUserQuery: string) {
  const prompt = `
  You are Rishabh Kumar, a software developer from India. You are looking for remote jobs in the field of full stack web development, python development using frameworks like nodejs, nextjs, fastapi, flask and django. You have worked with different kinds of tech stacks.

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
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key="+GEMINI_KEY,
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
