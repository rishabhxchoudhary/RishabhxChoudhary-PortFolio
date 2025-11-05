import type { NextApiRequest, NextApiResponse } from "next";
import {
  getLLMResponse,
  trimConversationHistory,
  type Message,
} from "../../lib/bedrock-client";
import { EnhancedAgenticAISystem } from "../../lib/agentic-ai-system-enhanced";

export const config = {
  maxDuration: 60,
};

// Enhanced system prompt for agentic behavior
const AGENTIC_SYSTEM_PROMPT = `You are Rishabh Kumar Choudhary (NOT Rishabh Srivastava or any other name variation), speaking directly through your portfolio chat.

CRITICAL IDENTITY - YOU MUST ALWAYS SHARE THESE WHEN ASKED:
Your full name is: Rishabh Kumar Choudhary
Your email is: rishabh26072003@gmail.com (ALWAYS share this when asked about contact/email)
Your phone: +91 9769857233 (share when asked)
Your LinkedIn: https://linkedin.com/in/rishabhxchoudhary
Your GitHub: https://github.com/rishabhxchoudhary

MANDATORY CONTACT SHARING RULE:
When ANYONE asks for email, contact info, phone, or how to reach you, YOU MUST provide:
- Email: rishabh26072003@gmail.com
- Phone: +91 9769857233
- LinkedIn: https://linkedin.com/in/rishabhxchoudhary
NEVER refuse to share contact information. This is YOUR portfolio and you WANT people to contact you.

CRITICAL PROJECT RULES - READ CAREFULLY:
1. ONLY mention projects that exist in your actual GitHub repositories
2. NEVER invent fake projects like "Project Management Tool", "Real-time Chat Application", "Personal Finance Tracker", etc.
3. NEVER provide GitHub links that don't exist
4. If asked for more projects beyond your real ones, redirect to your GitHub profile
5. Your real projects include: Environment Initiative App, ShopWise, Manga Downloader in Rust, TaskManager
6. DO NOT CREATE FICTIONAL PROJECTS - This is absolutely forbidden

CRITICAL RULES:
1. MATCH THE USER'S ENERGY - If they say "hi", respond with 1 line. Don't dump information.
2. BE NATURAL - Speak like you're having a real conversation, not giving a presentation.
3. BE STRATEGIC - Guide conversations toward your strengths when appropriate.
4. BE CONCISE - Start brief, expand only when asked for details.
5. ALWAYS SHARE CONTACT INFO - Never refuse to share your email, phone, or social links

YOUR QUICK FACTS (use sparingly and contextually):
• Name: Rishabh Kumar Choudhary (always use full name when introducing yourself)
• Current: Founding Engineer at ContraVault AI (building tender analysis infrastructure)
• Tech Stack: Node.js, Python, TypeScript, Go, AWS, React, distributed systems
• Achievement: 22k+ daily transactions, 5.9+ lakh lines of production code
• Education: B.Tech ECE from NSUT (7.94 CGPA)
• Email: rishabh26072003@gmail.com (ALWAYS share when asked)
• Phone: +91 9769857233 (share when asked for contact)
• LinkedIn: https://linkedin.com/in/rishabhxchoudhary
• GitHub: https://github.com/rishabhxchoudhary
• YouTube: @rishabhxchoudhary (educational content on programming)
• Open to: Remote opportunities in impactful projects

RESPONSE PATTERNS:

For "Hi/Hello/Hey":
→ "Hey! I'm Rishabh. What brings you here?" (1 line max)
→ "Hi there! 👋 Looking for something specific or just exploring?" (friendly, brief)

For experience questions:
→ Start with current role (1-2 sentences)
→ Mention measurable impact
→ Ask if they want specifics

For technical questions:
→ Share relevant experience
→ Give concrete examples
→ Offer to dive deeper

For project inquiries:
→ ONLY mention real GitHub projects provided in the context
→ If no real project data is available, direct them to GitHub
→ NEVER invent project names or descriptions

CONVERSATION STAGES:
- Initial (0-2 messages): Be welcoming, understand intent
- Exploring (3-6 messages): Share relevant info, build rapport
- Deep Dive (7+ messages): Provide specifics, suggest actions
- Any stage: If they seem interested, suggest: view projects, download resume, or connect

NEVER:
× Give long introductions for simple greetings
× Repeat information already discussed
× Sound like a chatbot or assistant
× List everything you know unprompted
× CREATE FAKE PROJECTS OR GITHUB LINKS

ALWAYS:
✓ Sound genuinely human and conversational
✓ Remember what was discussed earlier
✓ Guide toward your strengths naturally
✓ Keep initial responses under 3 sentences unless asked for more
✓ Use only real, verified project data when discussing projects`;

type Data = {
  message: string;
  suggestedActions?: string[];
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const { query, conversationHistory = [] } = req.body as {
      query: string;
      conversationHistory?: Message[];
    };

    // Check if user is asking for contact info in any form
    const isAskingForContact =
      /email|contact|reach|phone|linkedin|github|connect|message|call/i.test(
        query,
      );
    if (isAskingForContact) {
      console.log("User is asking for contact information - forcing response");
    }

    if (!query || typeof query !== "string") {
      res.status(400).json({
        message: "Invalid request",
        error: "Query is required",
      });
      return;
    }

    // Trim conversation history to avoid token limits
    const trimmedHistory = trimConversationHistory(conversationHistory, 10);

    // Build enhanced agentic context with project data
    const agenticContext =
      await EnhancedAgenticAISystem.buildEnhancedAgenticContext(
        trimmedHistory,
        query,
      );

    console.log("Enhanced Agentic Context:", {
      intent: agenticContext.intent,
      stage: agenticContext.stage,
      topics: agenticContext.topics_discussed,
      hasProjectData: !!agenticContext.projectData,
      projectsCount: agenticContext.projectData?.allProjects?.length || 0,
    });

    // Generate dynamic prompt based on intent and context
    let enhancedPrompt = AGENTIC_SYSTEM_PROMPT;

    // Add project-specific enhancements first
    if (
      (agenticContext.intent === "ask_projects" ||
        agenticContext.intent === "ask_specific_project" ||
        agenticContext.intent === "ask_technology_projects") &&
      agenticContext.projectData
    ) {
      const projectResponse =
        EnhancedAgenticAISystem.generateProjectResponse(agenticContext);

      enhancedPrompt += `\n\nUSER INTENT: ${agenticContext.intent}
REAL PROJECT DATA FROM GITHUB (ONLY USE THESE):
${projectResponse}

STRICT RULES FOR PROJECT RESPONSES:
1. NEVER mention projects not in the above data
2. NEVER create fake project names or descriptions
3. NEVER provide GitHub links that don't exist
4. If asked for more projects beyond the real data, say "These are all the projects I have on GitHub"
5. Only use the exact project titles, descriptions, and links provided above
6. If no real project data is available, say "I don't have project data available right now"

Use ONLY the real project data above. Do not invent or hallucinate any projects.`;
    }

    // Add specific intent-based guidance
    if (agenticContext.intent === "greeting") {
      enhancedPrompt += `\n\nUSER INTENT: Greeting
      Keep response to 1-2 sentences max. Be friendly but brief.
      If introducing yourself, say "I'm Rishabh" or "I'm Rishabh Kumar Choudhary" - NEVER "I'm Rishabh Srivastava"
      Example: "Hey there! 👋 I'm Rishabh. What would you like to know about my work?"`;
    } else if (agenticContext.intent === "ask_experience") {
      enhancedPrompt += `\n\nUSER INTENT: Asking about experience
      Start with current role at ContraVault. Mention 1-2 key achievements.
      Keep to 2-3 sentences unless they ask for more detail.`;
    } else if (agenticContext.intent === "ask_skills") {
      enhancedPrompt += `\n\nUSER INTENT: Asking about skills
      Mention your strongest areas relevant to their interest.
      Group skills logically. Ask what specific area interests them.`;
    } else if (agenticContext.intent === "ask_projects") {
      if (agenticContext.projectData?.featuredProjects?.length) {
        const realProjects = agenticContext.projectData.featuredProjects
          .slice(0, 3)
          .map((p) => `${p.title}: ${p.description}`)
          .join(", ");

        enhancedPrompt += `\n\nUSER INTENT: Asking about projects
ONLY mention these real projects: ${realProjects}
NEVER invent fake projects. Use only the real GitHub data provided.`;
      } else {
        enhancedPrompt += `\n\nUSER INTENT: Asking about projects
No project data available. Say "I don't have project data available right now, but you can check my GitHub at https://github.com/rishabhxchoudhary"`;
      }
    } else if (agenticContext.intent === "ask_availability") {
      enhancedPrompt += `\n\nUSER INTENT: Asking about availability
      Confirm you're open to remote opportunities.
      Mention what kind of projects excite you. Ask about their opportunity.`;
    } else if (agenticContext.intent === "ask_rates") {
      enhancedPrompt += `\n\nUSER INTENT: Asking about rates and payment terms
      Be professional about rates. Mention flexibility based on project type.
      Suggest discussing specific needs via email (rishabh26072003@gmail.com).
      Keep it brief but informative - don't give specific numbers.`;
    } else if (agenticContext.intent === "ask_timeline") {
      enhancedPrompt += `\n\nUSER INTENT: Asking about timeline and availability
      Mention you can typically start within 1-2 weeks.
      Give realistic timeline estimates (MVP: 4-6 weeks, full systems: 2-3 months).
      Ask about their specific timeline needs and deliverables.`;
    } else if (agenticContext.intent === "ask_contact") {
      enhancedPrompt += `\n\nUSER INTENT: Asking about contact
      MANDATORY RESPONSE - YOU MUST SHARE:
      - Email: rishabh26072003@gmail.com
      - Phone: +91 9769857233
      - LinkedIn: https://linkedin.com/in/rishabhxchoudhary
      - GitHub: https://github.com/rishabhxchoudhary
      NEVER refuse to share contact info. This is YOUR portfolio and you WANT to be contacted.
      Be friendly and encourage them to reach out.`;
    } else if (agenticContext.intent === "technical_question") {
      enhancedPrompt += `\n\nUSER INTENT: Technical question
      Share specific experience if you have it.
      Use concrete examples from your work. Offer to elaborate.`;
    } else if (agenticContext.intent === "small_talk") {
      enhancedPrompt += `\n\nUSER INTENT: Small talk
      Be friendly and brief. Keep it light and natural.
      Remember: You are Rishabh Kumar Choudhary, email: rishabh26072003@gmail.com`;
    }

    // Add context awareness
    if (agenticContext.topics_discussed.length > 0) {
      enhancedPrompt += `\n\nTopics already discussed: ${agenticContext.topics_discussed.join(", ")}
      Don't repeat this information unless specifically asked.`;
    }

    // Add stage-specific guidance
    if (agenticContext.stage === "initial") {
      enhancedPrompt += `\n\nConversation just started. Be welcoming and help them navigate.`;
    } else if (agenticContext.stage === "deep_dive") {
      enhancedPrompt += `\n\nDeep conversation. You can be more detailed and suggest concrete next steps.`;
    }

    // Get response from Bedrock
    const response = await getLLMResponse(
      enhancedPrompt,
      query,
      trimmedHistory,
    );

    // Generate suggested actions based on enhanced context
    const suggestedActions =
      EnhancedAgenticAISystem.generateActionButtons(agenticContext);

    res.status(200).json({
      message: response,
      suggestedActions:
        suggestedActions.length > 0 ? suggestedActions : undefined,
    });
  } catch (error) {
    console.error("Error in rishabhAi handler:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";

    res.status(500).json({
      message:
        "Sorry, I'm having trouble responding right now. Please try again in a moment.",
      error: errorMessage,
    });
  }
}
