import { Message } from "./bedrock-client";
import {
  GitHubProjectsService,
  type ProjectData,
} from "./github-projects-service";

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
  | "ask_specific_project"
  | "ask_technology_projects"
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

export interface EnhancedAgenticContext extends AgenticContext {
  projectData?: {
    allProjects: ProjectData[];
    featuredProjects: ProjectData[];
    requestedProject?: ProjectData;
    relatedProjects?: ProjectData[];
    searchResults?: ProjectData[];
    projectStats?: {
      totalProjects: number;
      topTechnologies: { name: string; count: number }[];
      hasLiveProjects: number;
    };
  };
}

export class EnhancedAgenticAISystem {
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
      /projects|portfolio|built|created|developed/i,
      /show.*work|examples|demos/i,
      /what.*made|what.*build/i,
      /your.*projects|recent.*projects/i,
    ],
    ask_specific_project: [
      /tell me about (shopwise|environment|manga|task|contravault)/i,
      /(shopwise|environment initiative|manga downloader|taskmanager|task manager)/i,
      /what is (shopwise|environment|manga|task)/i,
      /show me (shopwise|environment|manga|task)/i,
    ],
    ask_technology_projects: [
      /(react|nextjs|typescript|rust|python|node|mongodb|blockchain) projects/i,
      /projects.*using.*(react|nextjs|typescript|rust|python|node|mongodb)/i,
      /built.*with.*(react|nextjs|typescript|rust|python|node|mongodb)/i,
      /what.*built.*in.*(react|nextjs|typescript|rust|python|node|mongodb)/i,
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
    (context: EnhancedAgenticContext) => string
  > = {
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

    ask_skills: (_context) => {
      return "I work across the full stack - strong in Node.js, Python, TypeScript, and Go for backend. React/Next.js for frontend. Extensive AWS experience (ECS, Lambda, DynamoDB). Also comfortable with system design and distributed systems. Any particular area you'd like to dive deeper into?";
    },

    ask_projects: (context) => {
      if (context.projectData?.featuredProjects?.length) {
        const featured = context.projectData.featuredProjects.slice(0, 3);
        const projectSummary = featured
          .map(
            (p) =>
              `• **${p.title}** - ${p.technologies.slice(0, 3).join(", ")} - ${p.description.substring(0, 100)}...`,
          )
          .join("\n");

        const totalCount =
          context.projectData.allProjects?.length || featured.length;
        return `Here are my key projects (${totalCount} total on GitHub):\n\n${projectSummary}\n\nThese are the main ones I've been working on. Want to dive deeper into any of these?`;
      }
      return "I don't have project data available right now, but you can check my GitHub at https://github.com/rishabhxchoudhary for all my projects.";
    },

    ask_specific_project: (context) => {
      if (context.projectData?.requestedProject) {
        const project = context.projectData.requestedProject;
        return `**${project.title}** is one of my key projects! ${project.description}

**Tech Stack:** ${project.technologies.join(", ")}

${project.readmePreview || "This project showcases modern development practices with a robust architecture."}

${project.link ? `🔗 **Live Demo:** ${project.link}\n` : ""}📖 **GitHub:** ${project.github}

What specific aspect would you like to know more about - the technical implementation, challenges faced, or features?`;
      }
      return "I'd love to tell you about that project! Could you specify which one you're interested in? I have projects in e-commerce, blockchain, automation, and more.";
    },

    ask_technology_projects: (context) => {
      if (context.projectData?.relatedProjects?.length) {
        const projects = context.projectData.relatedProjects.slice(0, 3);
        const projectList = projects
          .map((p) => `• **${p.title}**: ${p.description.substring(0, 120)}...`)
          .join("\n\n");

        return `Here are my projects using that technology:\n\n${projectList}\n\nWould you like details about any specific project or see the live demos?`;
      }
      return "I use various technologies across my projects. What specific technology are you curious about? I work with React, Node.js, Python, Rust, MongoDB, and more.";
    },

    ask_education: (_context) => {
      return "I graduated from NSUT with a B.Tech in ECE (IoT specialization), CGPA 7.94. Did my schooling at DPS Rohini - scored 96.2% in XII and 92.7% in X. The IoT specialization really helped me understand system architecture better.";
    },

    ask_contact: (_context) => {
      return "Sure! Here's how you can reach me:\n\n📧 **Email:** rishabh26072003@gmail.com\n📱 **Phone:** +91 9769857233\n💼 **LinkedIn:** https://linkedin.com/in/rishabhxchoudhary\n🐙 **GitHub:** https://github.com/rishabhxchoudhary\n📺 **YouTube:** @rishabhxchoudhary\n\nFeel free to reach out anytime! What's the best way for us to connect?";
    },

    ask_availability: (_context) => {
      return "Yes, I'm open to exciting remote opportunities! I'm particularly interested in roles where I can work on scalable systems and make a real impact. What kind of opportunity did you have in mind?";
    },

    technical_question: (_context) => {
      return "That's a great technical question! I'd love to discuss this in detail. Could you be more specific about what aspect you'd like me to explain? I can share my experience and approach.";
    },

    ask_achievements: (_context) => {
      return "Won the Best Project Award on Blockchain at HackNSUT and ranked Top 30 out of 3,548 teams at Innerve Hacks 2022! At ContraVault, I'm proud of building infrastructure that scaled from 0 to 22k+ daily transactions. Also contributed 5.9+ lakh lines of production code!";
    },

    ask_current_role: (_context) => {
      return "I'm a Founding Engineer at ContraVault AI since October 2024. We're revolutionizing tender analysis with AI. I handle the entire technical infrastructure - from AWS setup to real-time data streaming. It's been an incredible journey building from scratch!";
    },

    ask_resume: (_context) => {
      return "I'd be happy to share my resume! You can download it directly from my portfolio using the Resume button, or I can send it to you via email at rishabh26072003@gmail.com. The resume includes my experience at ContraVault AI, technical skills, and project details. Which would you prefer?";
    },

    ask_rates: (_context) => {
      return "For rates and payment terms, I typically work on a project or hourly basis depending on the engagement type. My rates are competitive and reflect my experience building production systems at scale. I'm flexible on payment terms - we can discuss milestone-based payments or monthly invoicing. Let's connect via email at rishabh26072003@gmail.com to discuss your specific needs and budget!";
    },

    ask_timeline: (_context) => {
      return "I'm currently available for new projects and can typically start within 1-2 weeks. Project timelines depend on scope and complexity - I've delivered MVPs in 4-6 weeks and full-scale systems in 2-3 months. I believe in agile development with regular milestones and updates. What's your target timeline and key deliverables?";
    },

    small_talk: (_context) => {
      const responses = [
        "I'm doing great, thanks for asking! Excited to chat with you about tech and opportunities.",
        "All good here! Been working on some interesting challenges lately. How about you?",
        "Doing well! Always happy to connect with fellow tech enthusiasts.",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    },

    casual_chat: (_context) => {
      return "I'm Rishabh Kumar Choudhary, a software engineer who loves building things that matter. Currently at ContraVault AI as a Founding Engineer, previously at Blozum. I enjoy full-stack development, system design, and creating educational content on YouTube. What would you like to know specifically?";
    },

    unknown: (context) => {
      // If asking for more projects but we've exhausted real data
      if (
        context.topics_discussed.includes("projects") &&
        context.projectData?.allProjects
      ) {
        const totalProjects = context.projectData.allProjects.length;
        return `Those are the main projects I have on GitHub (${totalProjects} total). You can explore them all at https://github.com/rishabhxchoudhary.

Would you like me to tell you more about any specific project, or are you interested in something else like my experience at ContraVault or technical skills?`;
      }

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

    // Special case: If asking for "any other" or "more" projects after already discussing projects
    if (
      /^(any other|more|what else|anything else)(\s+(project|work))?s?\??$/i.test(
        normalizedMessage.trim(),
      ) ||
      /^(do you have )?(any other|more|additional)(\s+(project|work))?s?\??$/i.test(
        normalizedMessage.trim(),
      )
    ) {
      return "unknown"; // Will be handled by the response strategy to limit projects
    }

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
      if (/contact|email|phone/i.test(content)) {
        topics.add("contact");
      }
    }

    return Array.from(topics);
  }

  public static async buildEnhancedAgenticContext(
    messages: Message[],
    currentMessage: string,
  ): Promise<EnhancedAgenticContext> {
    // Get base context
    const intent = this.detectIntent(currentMessage);
    const stage = this.analyzeConversationStage(messages);
    const topics_discussed = this.extractTopicsDiscussed(messages);
    const user_interests = this.extractUserInterests(messages);

    const enhancedContext: EnhancedAgenticContext = {
      intent,
      stage,
      topics_discussed,
      user_interests,
      suggested_actions: [],
    };

    // Fetch project data if user is asking about projects
    if (
      intent === "ask_projects" ||
      intent === "ask_specific_project" ||
      intent === "ask_technology_projects" ||
      topics_discussed.includes("projects") ||
      this.isAskingAboutSpecificProject(currentMessage) ||
      this.isAskingAboutTechnology(currentMessage)
    ) {
      try {
        console.log("Fetching project data for AI context...");

        const allProjects = await GitHubProjectsService.getProjects();
        const featuredProjects =
          await GitHubProjectsService.getFeaturedProjects();
        const projectStats = await GitHubProjectsService.getProjectStats();

        enhancedContext.projectData = {
          allProjects,
          featuredProjects,
          projectStats,
        };

        // Check if asking about specific project
        const projectName = this.extractProjectName(currentMessage);
        if (projectName) {
          const requestedProject =
            await GitHubProjectsService.getProjectByName(projectName);
          if (requestedProject) {
            enhancedContext.projectData.requestedProject = requestedProject;
            enhancedContext.intent = "ask_specific_project";
          }
        }

        // Check if asking about specific technology
        const technology = this.extractTechnology(currentMessage);
        if (technology) {
          const relatedProjects =
            await GitHubProjectsService.getProjectsByTechnology(technology);
          if (relatedProjects.length > 0) {
            enhancedContext.projectData.relatedProjects = relatedProjects;
            enhancedContext.intent = "ask_technology_projects";
          }
        }

        console.log(
          `Project data loaded: ${allProjects.length} total, ${featuredProjects.length} featured`,
        );
      } catch (error) {
        console.error("Failed to fetch project data for AI context:", error);
      }
    }

    return enhancedContext;
  }

  private static isAskingAboutSpecificProject(message: string): boolean {
    const projectKeywords = [
      "shopwise",
      "shop wise",
      "environment initiative",
      "environment",
      "manga downloader",
      "manga",
      "taskmanager",
      "task manager",
      "contravault",
      "blockchain app",
      "e-commerce",
      "ecommerce",
      "rust project",
    ];

    const normalizedMessage = message.toLowerCase();
    return projectKeywords.some((keyword) =>
      normalizedMessage.includes(keyword),
    );
  }

  private static isAskingAboutTechnology(message: string): boolean {
    const techKeywords = [
      "react",
      "nextjs",
      "next.js",
      "typescript",
      "javascript",
      "node.js",
      "nodejs",
      "python",
      "rust",
      "mongodb",
      "mysql",
      "postgresql",
      "redis",
      "docker",
      "aws",
      "blockchain",
      "ethereum",
      "microservices",
      "api",
    ];

    const normalizedMessage = message.toLowerCase();
    return techKeywords.some(
      (keyword) =>
        normalizedMessage.includes(`${keyword} project`) ||
        normalizedMessage.includes(`projects using ${keyword}`) ||
        normalizedMessage.includes(`built with ${keyword}`) ||
        normalizedMessage.includes(`${keyword} development`),
    );
  }

  private static extractProjectName(message: string): string | null {
    const normalizedMessage = message.toLowerCase();

    // Specific project name patterns
    const projectPatterns = [
      /(?:tell me about|what is|show me|details about)\s+([a-zA-Z\s]+?)(?:\s|$|project)/i,
      /(shopwise|shop wise)/i,
      /(environment initiative|environment)/i,
      /(manga downloader|manga)/i,
      /(taskmanager|task manager)/i,
    ];

    for (const pattern of projectPatterns) {
      const match = normalizedMessage.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    // Direct project name mentions
    const directMatches = [
      "shopwise",
      "environment",
      "manga",
      "task",
      "taskmanager",
    ];
    const found = directMatches.find((name) =>
      normalizedMessage.includes(name),
    );

    return found || null;
  }

  private static extractTechnology(message: string): string | null {
    const technologies = [
      "react",
      "nextjs",
      "next.js",
      "typescript",
      "javascript",
      "node.js",
      "nodejs",
      "python",
      "rust",
      "mongodb",
      "mysql",
      "postgresql",
      "postgres",
      "redis",
      "docker",
      "aws",
      "blockchain",
      "ethereum",
      "microservices",
      "api",
    ];

    const normalizedMessage = message.toLowerCase();
    return (
      technologies.find(
        (tech) =>
          normalizedMessage.includes(tech) &&
          (normalizedMessage.includes(`${tech} project`) ||
            normalizedMessage.includes(`projects using ${tech}`) ||
            normalizedMessage.includes(`built with ${tech}`) ||
            normalizedMessage.includes(`${tech} development`) ||
            normalizedMessage.includes(`work with ${tech}`)),
      ) || null
    );
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

  public static generateActionButtons(
    context: EnhancedAgenticContext,
  ): string[] {
    const actions: string[] = [];

    // Dynamic action suggestions based on context
    if (
      context.intent === "ask_projects" ||
      context.intent === "ask_specific_project" ||
      context.topics_discussed.includes("projects")
    ) {
      actions.push("View All Projects");
      actions.push("GitHub Profile");
    }

    if (
      context.intent === "ask_specific_project" &&
      context.projectData?.requestedProject
    ) {
      if (context.projectData.requestedProject.link) {
        actions.push("View Live Demo");
      }
      actions.push("View Code");
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

    return [...new Set(actions)]; // Remove duplicates
  }

  public static generateProjectResponse(
    context: EnhancedAgenticContext,
  ): string {
    if (!context.projectData) return "";

    const { projectData } = context;

    // If asking about specific project
    if (projectData.requestedProject) {
      const project = projectData.requestedProject;
      return `**${project.title}** is one of my key projects! ${project.description}

**Tech Stack:** ${project.technologies.join(", ")}

${project.readmePreview || "This project showcases modern development practices with a robust architecture."}

${project.link ? `🔗 **Live Demo:** ${project.link}\n` : ""}📖 **GitHub:** ${project.github}

What specific aspect would you like to know more about?`;
    }

    // If asking about technology-specific projects
    if (projectData.relatedProjects && projectData.relatedProjects.length > 0) {
      const projects = projectData.relatedProjects.slice(0, 3);
      const projectList = projects
        .map(
          (p) =>
            `• **${p.title}**: ${p.description.substring(0, 100)}...${p.link ? ` ([Live Demo](${p.link}))` : ""}`,
        )
        .join("\n\n");

      return `Here are my projects using that technology:\n\n${projectList}\n\nWould you like details about any specific project?`;
    }

    // General project overview
    if (
      projectData.featuredProjects &&
      projectData.featuredProjects.length > 0
    ) {
      const featured = projectData.featuredProjects.slice(0, 3);
      const projectSummary = featured
        .map(
          (p) =>
            `• **${p.title}** - ${p.technologies.slice(0, 3).join(", ")} - ${p.description.substring(0, 80)}...`,
        )
        .join("\n\n");

      return `Here are some of my key projects:\n\n${projectSummary}\n\nWant to dive deeper into any of these or see more projects?`;
    }

    return "I've built several interesting projects across different technologies. What type of project interests you most?";
  }

  public static generateDynamicPrompt(
    userMessage: string,
    context: EnhancedAgenticContext,
  ): string {
    const intent = context.intent;
    const stage = context.stage;

    // Base response from strategy
    const baseResponse = this.RESPONSE_STRATEGIES[intent](context);

    // Add project-specific context if available
    let projectContext = "";
    if (context.projectData) {
      projectContext = this.generateProjectResponse(context);
    }

    // Combine for final prompt
    const prompt = `You are Rishabh Kumar Choudhary. The user's intent appears to be: ${intent}.

Conversation stage: ${stage}
Topics already discussed: ${context.topics_discussed.join(", ") || "none"}

${projectContext ? `\nREAL PROJECT DATA FROM GITHUB:\n${projectContext}\n\nSTRICT PROJECT RULES:\n- ONLY mention projects from the above data\n- NEVER create fake projects or GitHub links\n- If asked for more projects beyond the real data, politely redirect to exploring existing projects\n- Use exact project names and descriptions provided\n` : ""}

Respond in a way that:
1. Is appropriate for the intent and conversation stage
2. Is concise and natural (1-3 sentences for greetings, 2-4 for explanations)
3. Matches the user's energy level
4. Uses ONLY real project data when available (never invent projects)
5. Suggests next steps when appropriate

Base response guideline: ${baseResponse}

User message: ${userMessage}

Remember to:
- Be conversational but professional
- Don't repeat information already discussed
- Guide the conversation toward your strengths
- Use specific project details when available
- Keep initial responses brief and expand based on interest
- NEVER invent or hallucinate projects - only use real GitHub data`;

    return prompt;
  }
}
