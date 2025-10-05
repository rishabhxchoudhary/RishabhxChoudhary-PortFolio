import { Message } from "./bedrock-client";

export type UserIntent =
  | "greeting"
  | "ask_experience"
  | "ask_skills"
  | "ask_projects"
  | "ask_education"
  | "ask_contact"
  | "ask_availability"
  | "technical_question"
  | "casual_chat"
  | "ask_achievements"
  | "ask_current_role"
  | "ask_resume"
  | "ask_rates"
  | "ask_timeline"
  | "small_talk"
  | "unknown";

export type ConversationStage =
  | "initial"
  | "exploring"
  | "deep_dive"
  | "closing";

export interface AgenticContext {
  intent: UserIntent;
  stage: ConversationStage;
  topics_discussed: string[];
  user_interests: string[];
  suggested_actions: string[];
}

export class AgenticAISystem {
  private static readonly INTENT_PATTERNS: Record<UserIntent, RegExp[]> = {
    greeting: [
      /^(hi|hey|hello|howdy|greetings|yo|sup)$/i,
      /^(good\s+(morning|afternoon|evening|day))$/i,
      /^(hi|hello|hey)\s+there$/i,
    ],
    ask_experience: [
      /experience|work|job|career|employment|position|role/i,
      /where.*work|what.*do|current.*role/i,
      /tell.*about.*work|describe.*experience/i,
    ],
    ask_skills: [
      /skills|technologies|tech\s+stack|languages|frameworks/i,
      /what.*know|what.*use|familiar.*with/i,
      /expertise|proficient|competent/i,
    ],
    ask_projects: [
      /project|portfolio|built|created|developed/i,
      /show.*work|examples|demos/i,
      /what.*made|what.*build/i,
    ],
    ask_education: [
      /education|degree|university|college|study|qualification/i,
      /where.*study|academic|school|cgpa|grades/i,
    ],
    ask_contact: [
      /contact|email|phone|reach|connect|linkedin|github/i,
      /how.*contact|get.*touch|message/i,
      /what.*email|what.*phone|what.*number/i,
      /ur\s+email|ur\s+phone|your\s+email|your\s+phone/i,
    ],
    ask_availability: [
      /available|hire|freelance|open.*to|looking|remote/i,
      /when.*start|join|opportunity/i,
    ],
    technical_question: [
      /how.*implement|explain|difference.*between|what.*is/i,
      /code|algorithm|system.*design|architecture/i,
      /best.*practice|optimize|performance/i,
    ],
    ask_achievements: [
      /achievements|awards|recognition|accomplish|hackathon|won/i,
      /proud|notable|highlight/i,
    ],
    ask_current_role: [
      /current|now|present|today|contravault|founding.*engineer/i,
      /what.*doing.*now|tell.*current/i,
    ],
    ask_resume: [/resume|cv|download|pdf|document/i, /send.*resume|share.*cv/i],
    ask_rates: [
      /rate|rates|cost|pricing|payment|terms|charge|fee|hourly|budget/i,
      /how.*much|what.*cost|what.*charge/i,
      /payment.*terms|billing|invoice/i,
    ],
    ask_timeline: [
      /timeline|deadline|timeframe|duration|when.*available|start.*date/i,
      /how.*long|estimated.*time|delivery|completion/i,
      /availability.*timeline|project.*timeline/i,
    ],
    small_talk: [
      /how.*are.*you|how.*doing|what.*up/i,
      /nice|cool|awesome|great|interesting/i,
      /thanks|thank.*you|appreciate/i,
    ],
    casual_chat: [
      /tell.*about.*yourself|who.*are.*you/i,
      /introduce|introduction/i,
    ],
    unknown: [],
  };

  private static readonly RESPONSE_STRATEGIES: Record<
    UserIntent,
    (context: AgenticContext) => string
  > = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    greeting: (_context) => {
      const greetings = [
        "Hey there! 👋 I'm Rishabh. How can I help you today?",
        "Hi! Welcome to my portfolio. What would you like to know about my work?",
        "Hello! I'm Rishabh, great to connect with you. What brings you here?",
        "Hey! Thanks for stopping by. Interested in hearing about my projects or experience?",
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    },

    ask_experience: (context) => {
      if (context.topics_discussed.includes("experience_detail")) {
        return "I've covered my main experience already. Would you like to know more about specific projects I worked on at ContraVault or Blozum? Or perhaps my technical contributions?";
      }
      return "I'm currently a Founding Engineer at ContraVault AI where I build infrastructure handling 22k+ daily financial transactions. Previously interned at Blozum working on WhatsApp bots and automation tools. Want to hear more about any specific role?";
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ask_skills: (_context) => {
      return "I work across the full stack - strong in Node.js, Python, TypeScript, and Go for backend. React/Next.js for frontend. Extensive AWS experience (ECS, Lambda, DynamoDB). Also comfortable with system design and distributed systems. Any particular area you'd like to dive deeper into?";
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ask_projects: (_context) => {
      return "I've built several interesting projects! At ContraVault, I implemented SSE streaming for real-time data and parallel S3 uploads. Personal projects include ShopWise (e-commerce platform), a Rust-based manga downloader, and blockchain apps. Which type interests you most?";
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ask_education: (_context) => {
      return "I graduated from NSUT with a B.Tech in ECE (IoT specialization), CGPA 7.94. Did my schooling at DPS Rohini - scored 96.2% in XII and 92.7% in X. The IoT specialization really helped me understand system architecture better.";
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ask_contact: (_context) => {
      return "Sure! Here's how you can reach me:\n\n📧 Email: rishabh26072003@gmail.com\n📱 Phone: +91 9769857233\n💼 LinkedIn: https://linkedin.com/in/rishabhxchoudhary\n🐙 GitHub: https://github.com/rishabhxchoudhary\n📺 YouTube: @rishabhxchoudhary\n\nFeel free to reach out anytime! What's the best way for us to connect?";
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ask_availability: (_context) => {
      return "Yes, I'm open to exciting remote opportunities! I'm particularly interested in roles where I can work on scalable systems and make a real impact. What kind of opportunity did you have in mind?";
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    technical_question: (_context) => {
      return "That's a great technical question! I'd love to discuss this in detail. Could you be more specific about what aspect you'd like me to explain? I can share my experience and approach.";
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ask_achievements: (_context) => {
      return "Won the Best Project Award on Blockchain at HackNSUT and ranked Top 30 out of 3,548 teams at Innerve Hacks 2022! At ContraVault, I'm proud of building infrastructure that scaled from 0 to 22k+ daily transactions. Also contributed 5.9+ lakh lines of production code!";
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ask_current_role: (_context) => {
      return "I'm a Founding Engineer at ContraVault AI since October 2024. We're revolutionizing tender analysis with AI. I handle the entire technical infrastructure - from AWS setup to real-time data streaming. It's been an incredible journey building from scratch!";
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ask_resume: (_context) => {
      return "I'd be happy to share my resume! You can download it directly from my portfolio using the Resume button, or I can send it to you via email at rishabh26072003@gmail.com. The resume includes my experience at ContraVault AI, technical skills, and project details. Which would you prefer?";
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ask_rates: (_context) => {
      return "For rates and payment terms, I typically work on a project or hourly basis depending on the engagement type. My rates are competitive and reflect my experience building production systems at scale. I'm flexible on payment terms - we can discuss milestone-based payments or monthly invoicing. Let's connect via email at rishabh26072003@gmail.com to discuss your specific needs and budget!";
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ask_timeline: (_context) => {
      return "I'm currently available for new projects and can typically start within 1-2 weeks. Project timelines depend on scope and complexity - I've delivered MVPs in 4-6 weeks and full-scale systems in 2-3 months. I believe in agile development with regular milestones and updates. What's your target timeline and key deliverables?";
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    small_talk: (_context) => {
      const responses = [
        "I'm doing great, thanks for asking! Excited to chat with you about tech and opportunities.",
        "All good here! Been working on some interesting challenges lately. How about you?",
        "Doing well! Always happy to connect with fellow tech enthusiasts.",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    casual_chat: (_context) => {
      return "I'm Rishabh Kumar Choudhary, a software engineer who loves building things that matter. Currently at ContraVault AI as a Founding Engineer, previously at Blozum. I enjoy full-stack development, system design, and creating educational content on YouTube. What would you like to know specifically?";
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    unknown: (_context) => {
      const responses = [
        "Interesting question! Could you elaborate a bit? I can share about my experience, projects, skills, or anything else you'd like to know.",
        "I'd be happy to help! Are you looking to know about my technical background, current work, or something else?",
        "Great question! Feel free to ask about my work at ContraVault, technical skills, projects, or availability for opportunities.",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    },
  };

  public static detectIntent(message: string): UserIntent {
    const normalizedMessage = message.toLowerCase().trim();

    // Check each intent pattern
    for (const [intent, patterns] of Object.entries(this.INTENT_PATTERNS)) {
      if (intent === "unknown") continue;

      for (const pattern of patterns) {
        if (pattern.test(normalizedMessage)) {
          return intent as UserIntent;
        }
      }
    }

    // Default to unknown if no pattern matches
    return "unknown";
  }

  public static analyzeConversationStage(
    messages: Message[],
  ): ConversationStage {
    if (messages.length <= 2) return "initial";
    if (messages.length <= 6) return "exploring";
    if (messages.length <= 12) return "deep_dive";
    return "closing";
  }

  public static extractTopicsDiscussed(messages: Message[]): string[] {
    const topics = new Set<string>();

    for (const message of messages) {
      const content = message.content.toLowerCase();

      if (/contravault|founding\s*engineer|current/i.test(content)) {
        topics.add("current_role");
      }
      if (/experience|work|job|career/i.test(content)) {
        topics.add("experience");
      }
      if (/skill|tech|language|framework/i.test(content)) {
        topics.add("skills");
      }
      if (/project|built|created/i.test(content)) {
        topics.add("projects");
      }
      if (/education|degree|university|nsut/i.test(content)) {
        topics.add("education");
      }
      if (/achievement|award|hackathon/i.test(content)) {
        topics.add("achievements");
      }
    }

    return Array.from(topics);
  }

  public static generateDynamicPrompt(
    userMessage: string,
    context: AgenticContext,
  ): string {
    const intent = context.intent;
    const stage = context.stage;

    // Base response from strategy
    const baseResponse = this.RESPONSE_STRATEGIES[intent](context);

    // Add suggestions based on context
    const suggestions = this.generateSuggestions(context);

    // Combine for final prompt
    const prompt = `You are Rishabh Kumar Choudhary. The user's intent appears to be: ${intent}.

    Conversation stage: ${stage}
    Topics already discussed: ${context.topics_discussed.join(", ") || "none"}

    Respond in a way that:
    1. Is appropriate for the intent and conversation stage
    2. Is concise and natural (1-3 sentences for greetings, 2-4 for explanations)
    3. Matches the user's energy level
    4. Suggests next steps when appropriate

    Base response guideline: ${baseResponse}

    ${suggestions.length > 0 ? `Consider suggesting: ${suggestions.join(", ")}` : ""}

    User message: ${userMessage}

    Remember to:
    - Be conversational but professional
    - Don't repeat information already discussed
    - Guide the conversation toward your strengths
    - Offer specific examples when relevant
    - Keep initial responses brief and expand based on interest`;

    return prompt;
  }

  private static generateSuggestions(context: AgenticContext): string[] {
    const suggestions: string[] = [];

    if (context.stage === "initial" && context.intent === "greeting") {
      suggestions.push("Ask what brings them here");
      suggestions.push("Offer to share about experience or projects");
    }

    if (
      context.stage === "exploring" &&
      !context.topics_discussed.includes("current_role")
    ) {
      suggestions.push("Mention current role at ContraVault");
    }

    if (context.stage === "deep_dive" && context.intent === "ask_experience") {
      suggestions.push("Share specific technical challenges solved");
      suggestions.push("Mention impact metrics");
    }

    if (
      context.topics_discussed.length >= 3 &&
      !context.topics_discussed.includes("contact")
    ) {
      suggestions.push("Offer to connect further");
    }

    return suggestions;
  }

  public static generateActionButtons(context: AgenticContext): string[] {
    const actions: string[] = [];

    // Dynamic action suggestions based on context
    if (
      context.intent === "ask_projects" ||
      context.topics_discussed.includes("projects")
    ) {
      actions.push("View Projects");
      actions.push("GitHub Profile");
    }

    if (context.intent === "ask_resume" || context.stage === "deep_dive") {
      actions.push("Download Resume");
      actions.push("Send Email for Resume");
    }

    if (context.intent === "ask_contact" || context.stage === "closing") {
      actions.push("LinkedIn Profile");
      actions.push("Send Email");
      actions.push("Download Resume");
    }

    if (
      context.intent === "ask_skills" &&
      !context.topics_discussed.includes("projects")
    ) {
      actions.push("See Project Examples");
    }

    // Add resume option for experience discussions
    if (
      context.intent === "ask_experience" ||
      context.topics_discussed.includes("experience")
    ) {
      actions.push("Download Resume");
    }

    return actions;
  }

  public static buildAgenticContext(
    messages: Message[],
    currentMessage: string,
  ): AgenticContext {
    return {
      intent: this.detectIntent(currentMessage),
      stage: this.analyzeConversationStage(messages),
      topics_discussed: this.extractTopicsDiscussed(messages),
      user_interests: this.extractUserInterests(messages),
      suggested_actions: [],
    };
  }

  private static extractUserInterests(messages: Message[]): string[] {
    const interests = new Set<string>();

    for (const message of messages) {
      if (message.role !== "user") continue;

      const content = message.content.toLowerCase();

      if (/aws|cloud|infrastructure/i.test(content)) {
        interests.add("cloud_infrastructure");
      }
      if (/frontend|react|ui|ux/i.test(content)) {
        interests.add("frontend");
      }
      if (/backend|api|server|database/i.test(content)) {
        interests.add("backend");
      }
      if (/ai|machine\s*learning|llm/i.test(content)) {
        interests.add("ai_ml");
      }
      if (/blockchain|web3|crypto/i.test(content)) {
        interests.add("blockchain");
      }
      if (/system\s*design|architecture|scale/i.test(content)) {
        interests.add("system_design");
      }
    }

    return Array.from(interests);
  }
}

export function createAgenticSystemPrompt(): string {
  return `You are Rishabh Kumar Choudhary (NOT Rishabh Srivastava), responding through an intelligent chat system on your portfolio website.

IMPORTANT CONTACT INFORMATION (ALWAYS SHARE WHEN ASKED):
• Name: Rishabh Kumar Choudhary
• Email: rishabh26072003@gmail.com
• Phone: +91 9769857233
• LinkedIn: https://linkedin.com/in/rishabhxchoudhary
• GitHub: https://github.com/rishabhxchoudhary

CORE PRINCIPLES:
1. Match the user's energy - brief for brief, detailed for detailed
2. Be genuinely conversational, not robotic
3. Guide strategically toward your strengths
4. Remember and reference context naturally
5. Suggest logical next steps when appropriate

YOUR BACKGROUND (use naturally, don't dump all at once):
• Name: Rishabh Kumar Choudhary
• Current: Founding Engineer at ContraVault AI (Oct 2024-Present)
• Previous: Software Developer Intern at Blozum
• Education: B.Tech ECE from NSUT (7.94 CGPA)
• Key Skills: Full-stack, AWS, System Design, Node.js, Python, React
• Achievements: Best Blockchain Project at HackNSUT, Top 30 at Innerve Hacks
• Email: rishabh26072003@gmail.com (ALWAYS share when asked)
• Phone: +91 9769857233 (share when asked for contact)
• LinkedIn: https://linkedin.com/in/rishabhxchoudhary
• GitHub: https://github.com/rishabhxchoudhary
• Resume: Available for download on portfolio or can be sent via email

RESPONSE GUIDELINES BY MESSAGE TYPE:

Greetings (Hi, Hello, Hey):
→ Brief, friendly response (1 line)
→ Offer help or ask what they're interested in
Example: "Hey! I'm Rishabh. What brings you to my portfolio?"

Questions about experience:
→ Start with current role briefly
→ Expand based on follow-up interest
→ Include specific metrics when relevant

Technical questions:
→ Share concrete examples from your work
→ Mention technologies used
→ Offer to elaborate on specific aspects

CONVERSATION FLOW:
Stage 1 (Initial): Be welcoming, understand their interest
Stage 2 (Exploring): Share relevant details, guide toward strengths
Stage 3 (Deep Dive): Provide specifics, showcase expertise
Stage 4 (Closing): Suggest connection, next steps

NEVER:
× Dump your entire resume unprompted
× Repeat information already shared
× Be overly formal or robotic
× Make up information not in your background

ALWAYS:
✓ Sound like a real person having a conversation
✓ Be enthusiastic about technology
✓ Reference previous messages naturally
✓ Suggest relevant actions (view projects, download resume, connect)`;
}
