import type { NextApiRequest, NextApiResponse } from "next";

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  stargazers_count: number;
  forks_count: number;
  archived: boolean;
  fork: boolean;
}

interface ProjectData {
  title: string;
  technologies: string[];
  description: string;
  readmeContent?: string;
  readmePreview: string;
  link?: string;
  github: string;
  image?: string;
  priority?: number;
  show?: boolean;
}

// In-memory cache (in production, consider using Redis)
let projectsCache: {
  data: ProjectData[] | null;
  timestamp: number;
  lastUpdated: string;
} = {
  data: null,
  timestamp: 0,
  lastUpdated: "",
};

const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
const USERNAME = "rishabhxchoudhary";

// Configuration for specific repositories
const PROJECT_CONFIG: Record<string, Partial<ProjectData>> = {
  "Environment-Initiative-App": {
    technologies: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Blockchain",
      "Ethereum",
    ],
    image: "/images/environment-initiative-app.png",
    link: "https://environment-initiative-app-frontend.vercel.app/",
    priority: 1,
  },
  ShopWise: {
    technologies: [
      "TypeScript",
      "Next.js",
      "MongoDB",
      "Docker",
      "Redis",
      "JWT",
    ],
    image: "/images/shopwise.png",
    link: "https://shop-wise.vercel.app/",
    priority: 2,
  },
  "Manga-Downloader-in-Rust": {
    title: "Manga Downloader in Rust",
    technologies: ["Rust", "Tokio", "Async/Await", "CLI", "Multithreading"],
    image: "/images/manga.png",
    priority: 3,
  },
  TaskManager: {
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Tailwind CSS",
      "REST API",
    ],
    image: "/images/taskmanager.png",
    link: "https://task-manager-nu-one.vercel.app/",
    priority: 4,
  },
  "RishabhxChoudhary-PortFolio": {
    show: false,
  },
  "nextjs-portfolio": {
    show: false,
  },
};

// Technology mapping
const TECH_MAPPING: Record<string, string[]> = {
  javascript: ["JavaScript"],
  typescript: ["TypeScript"],
  react: ["React.js"],
  nextjs: ["Next.js"],
  nodejs: ["Node.js"],
  mongodb: ["MongoDB"],
  mysql: ["MySQL"],
  postgresql: ["PostgreSQL"],
  redis: ["Redis"],
  docker: ["Docker"],
  rust: ["Rust"],
  python: ["Python"],
  java: ["Java"],
  cpp: ["C++"],
  c: ["C"],
  go: ["Go"],
  blockchain: ["Blockchain"],
  ethereum: ["Ethereum"],
  express: ["Express.js"],
  tailwindcss: ["Tailwind CSS"],
  bootstrap: ["Bootstrap"],
  sass: ["Sass"],
  css: ["CSS"],
  html: ["HTML"],
  vue: ["Vue.js"],
  angular: ["Angular"],
  flask: ["Flask"],
  django: ["Django"],
  php: ["PHP"],
  laravel: ["Laravel"],
  spring: ["Spring Boot"],
  jwt: ["JWT"],
  api: ["API"],
  rest: ["REST API"],
  graphql: ["GraphQL"],
  websocket: ["WebSocket"],
  "socket-io": ["Socket.IO"],
  firebase: ["Firebase"],
  aws: ["AWS"],
  heroku: ["Heroku"],
  vercel: ["Vercel"],
  netlify: ["Netlify"],
};

// Fallback project data in case GitHub API fails
const FALLBACK_PROJECTS: ProjectData[] = [
  {
    title: "Environment Initiative App",
    technologies: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Blockchain",
      "Ethereum",
    ],
    description:
      "A full-stack web application supporting environmental initiatives with blockchain-based Ethereum donations and immutable transaction recording.",
    readmePreview:
      "Developed a comprehensive platform for environmental initiatives featuring blockchain integration for transparent donations...",
    github: "https://github.com/rishabhxchoudhary/Environment-Initiative-App",
    link: "https://environment-initiative-app-frontend.vercel.app/",
    image: "/images/environment-initiative-app.png",
    priority: 1,
    show: true,
  },
  {
    title: "ShopWise",
    technologies: [
      "TypeScript",
      "Next.js",
      "MongoDB",
      "Docker",
      "Redis",
      "JWT",
    ],
    description:
      "A scalable e-commerce platform with microservices architecture, implementing Redis caching and JWT-based authentication.",
    readmePreview:
      "Built a scalable e-commerce platform with microservices architecture, implementing Redis caching for product catalogs...",
    github: "https://github.com/rishabhxchoudhary/ShopWise",
    link: "https://shop-wise.vercel.app/",
    image: "/images/shopwise.png",
    priority: 2,
    show: true,
  },
  {
    title: "Manga Downloader in Rust",
    technologies: ["Rust", "Tokio", "Async/Await", "CLI", "Multithreading"],
    description:
      "A high-performance CLI tool using Rust's async runtime for concurrent chapter downloads with parallel image fetching.",
    readmePreview:
      "Engineered a high-performance CLI tool using Rust's async runtime (Tokio) for concurrent chapter downloads...",
    github: "https://github.com/rishabhxchoudhary/Manga-Downloader-in-Rust",
    image: "/images/manga.png",
    priority: 3,
    show: true,
  },
  {
    title: "TaskManager",
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Tailwind CSS",
      "REST API",
    ],
    description:
      "A full-stack task management application with real-time updates, drag-and-drop functionality, and advanced filtering.",
    readmePreview:
      "Built a full-stack task management application with real-time updates, drag-and-drop functionality...",
    github: "https://github.com/rishabhxchoudhary/TaskManager",
    link: "https://task-manager-nu-one.vercel.app/",
    image: "/images/taskmanager.png",
    priority: 4,
    show: true,
  },
];

// GitHub API request with proper headers and rate limit monitoring
async function fetchFromGitHub(
  url: string,
): Promise<Response & { rateLimitInfo?: any }> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Portfolio-Website-v1.0",
  };

  // Add GitHub token if available (increases rate limit to 5000/hour)
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
    console.log("Using authenticated GitHub API requests");
  } else {
    console.warn(
      "No GITHUB_TOKEN found - using unauthenticated requests (60/hour limit)",
    );
  }

  const response = await fetch(url, { headers });

  // Extract rate limit information from headers
  const rateLimitInfo = {
    limit: response.headers.get("x-ratelimit-limit"),
    remaining: response.headers.get("x-ratelimit-remaining"),
    reset: response.headers.get("x-ratelimit-reset"),
    used: response.headers.get("x-ratelimit-used"),
  };

  console.log(
    `GitHub API Rate Limit: ${rateLimitInfo.remaining}/${rateLimitInfo.limit} remaining`,
  );

  // Warn if getting close to rate limit
  const remaining = parseInt(rateLimitInfo.remaining || "0");
  if (remaining < 100) {
    console.warn(
      `⚠️  GitHub API rate limit low: ${remaining} requests remaining`,
    );
  }

  (response as any).rateLimitInfo = rateLimitInfo;
  return response as Response & { rateLimitInfo?: any };
}

// Function to fetch README content with caching
async function fetchReadme(
  repoName: string,
): Promise<{ content: string; preview: string } | null> {
  try {
    const response = await fetchFromGitHub(
      `https://api.github.com/repos/${USERNAME}/${repoName}/readme`,
    );

    if (!response.ok) {
      if (response.status === 404) {
        console.log(`No README found for ${repoName}`);
        return null;
      }
      console.log(`README fetch failed for ${repoName}: ${response.status}`);
      return null;
    }

    const data = await response.json();
    const content = Buffer.from(data.content, "base64").toString("utf-8");

    // Create a preview (first 250 characters, cleaned up)
    let preview = content
      // Remove title (first h1)
      .replace(/^#\s+.*$/m, "")
      // Remove badges and shields
      .replace(/!\[.*?\]\(.*?\)/g, "")
      // Remove other markdown headers
      .replace(/#{1,6}\s+/g, "")
      // Convert links to just text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      // Remove code backticks
      .replace(/`([^`]+)`/g, "$1")
      // Remove bold/italic formatting
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      // Convert list items
      .replace(/^\s*[-*+]\s+/gm, "• ")
      // Remove code blocks
      .replace(/```[\s\S]*?```/g, "")
      // Replace multiple newlines/spaces with single space
      .replace(/\s+/g, " ")
      .trim();

    // Take first 250 chars for preview
    preview = preview.substring(0, 250);
    if (content.length > 250) {
      preview += "...";
    }

    return { content, preview };
  } catch (error) {
    console.error(`Error fetching README for ${repoName}:`, error);
    return null;
  }
}

function mapTechnologies(repo: GitHubRepo): string[] {
  const technologies = new Set<string>();

  // Add language
  if (repo.language) {
    const lang = repo.language.toLowerCase();
    if (TECH_MAPPING[lang]) {
      TECH_MAPPING[lang].forEach((tech) => technologies.add(tech));
    } else {
      technologies.add(repo.language);
    }
  }

  // Add technologies from topics
  repo.topics.forEach((topic) => {
    const topicLower = topic.toLowerCase();
    if (TECH_MAPPING[topicLower]) {
      TECH_MAPPING[topicLower].forEach((tech) => technologies.add(tech));
    } else {
      // Capitalize first letter for unknown topics
      const formatted = topic
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      technologies.add(formatted);
    }
  });

  return Array.from(technologies);
}

async function transformRepoToProject(repo: GitHubRepo): Promise<ProjectData> {
  const config = PROJECT_CONFIG[repo.name] || {};

  // Fetch README content (with error handling)
  let readmeData: { content: string; preview: string } | null = null;
  try {
    readmeData = await fetchReadme(repo.name);
  } catch (error) {
    console.log(
      `Failed to fetch README for ${repo.name}, continuing without it`,
    );
  }

  let description =
    config.description || repo.description || "No description available.";
  let readmePreview = "";
  let readmeContent = "";

  if (readmeData) {
    readmeContent = readmeData.content;
    readmePreview = readmeData.preview;
    // Use README preview as description if no custom description is provided
    if (!config.description && readmeData.preview) {
      description = readmeData.preview;
    }
  }

  return {
    title: config.title || repo.name.replace(/-/g, " ").replace(/_/g, " "),
    technologies: config.technologies || mapTechnologies(repo),
    description,
    readmeContent,
    readmePreview,
    link: config.link || repo.homepage || undefined,
    github: repo.html_url,
    image: config.image,
    priority: config.priority || 999,
    show: config.show !== false,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const forceRefresh = req.query.refresh === "true";
    const currentTime = Date.now();

    // Check cache first (unless force refresh)
    if (
      !forceRefresh &&
      projectsCache.data &&
      currentTime - projectsCache.timestamp < CACHE_DURATION
    ) {
      console.log("Serving from cache");
      return res.status(200).json({
        projects: projectsCache.data,
        lastUpdated: projectsCache.lastUpdated,
        cached: true,
        cacheAge: Math.round(
          (currentTime - projectsCache.timestamp) / 1000 / 60,
        ),
        authenticated: !!process.env.GITHUB_TOKEN,
      });
    }

    console.log("Fetching fresh data from GitHub API");

    // Fetch repositories
    const reposResponse = await fetchFromGitHub(
      `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`,
    );

    const rateLimitInfo = (reposResponse as any).rateLimitInfo;

    if (!reposResponse.ok) {
      const errorMessage =
        reposResponse.status === 403
          ? `Rate limit exceeded. ${process.env.GITHUB_TOKEN ? "Authenticated" : "Add GITHUB_TOKEN env variable for 5000/hour limit instead of 60/hour"}`
          : `GitHub API error: ${reposResponse.status}`;

      console.error(
        `GitHub API Error: ${reposResponse.status} - ${errorMessage}`,
      );

      // If we have cached data and GitHub API fails, return cached data
      if (projectsCache.data) {
        console.log("GitHub API failed, serving stale cache");
        return res.status(200).json({
          projects: projectsCache.data,
          lastUpdated: projectsCache.lastUpdated,
          cached: true,
          stale: true,
          error: errorMessage,
          rateLimitInfo,
        });
      }

      // If no cache and API fails, return fallback data
      console.log("GitHub API failed, serving fallback data");
      return res.status(200).json({
        projects: FALLBACK_PROJECTS,
        lastUpdated: new Date().toISOString(),
        fallback: true,
        error: errorMessage,
        rateLimitInfo,
      });
    }

    const repos: GitHubRepo[] = await reposResponse.json();

    // Filter repositories
    const filteredRepos = repos.filter((repo) => {
      if (repo.fork || repo.archived) return false;
      if (PROJECT_CONFIG[repo.name]?.show === false) return false;
      return true;
    });

    // Transform repositories to project format (limiting README fetches to avoid rate limits)
    const priorityRepos = filteredRepos.slice(0, 10); // Only fetch READMEs for top 10 repos
    const projectPromises = priorityRepos.map((repo) =>
      transformRepoToProject(repo),
    );

    // For remaining repos, create projects without README content
    const remainingRepos = filteredRepos
      .slice(10)
      .map((repo) => transformRepoToProject(repo));

    const [priorityProjects, ...otherProjects] = await Promise.all([
      Promise.all(projectPromises),
      ...remainingRepos,
    ]);

    const allProjects = [...priorityProjects, ...otherProjects].flat();

    // Filter out projects without meaningful content and sort
    const validProjects = allProjects
      .filter(
        (project) =>
          project.show &&
          (project.readmeContent ||
            project.description !== "No description available." ||
            PROJECT_CONFIG[project.title.replace(/\s+/g, "-")]),
      )
      .sort((a, b) => (a.priority || 999) - (b.priority || 999))
      .slice(0, 20); // Limit to 20 projects

    // Update cache
    const lastUpdated = new Date().toISOString();
    projectsCache = {
      data: validProjects,
      timestamp: currentTime,
      lastUpdated,
    };

    // Set cache headers
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=1800, stale-while-revalidate=3600",
    );

    res.status(200).json({
      projects: validProjects,
      lastUpdated,
      totalRepos: repos.length,
      filteredRepos: filteredRepos.length,
      cached: false,
      rateLimitInfo,
      authenticated: !!process.env.GITHUB_TOKEN,
    });
  } catch (error) {
    console.error("Error fetching GitHub projects:", error);

    // Try to serve cached data on error
    if (projectsCache.data) {
      console.log("Error occurred, serving cached data");
      return res.status(200).json({
        projects: projectsCache.data,
        lastUpdated: projectsCache.lastUpdated,
        cached: true,
        stale: true,
        error: "API error, serving cached data",
      });
    }

    // If no cache available, serve fallback data
    console.log("Error occurred, serving fallback data");
    res.status(200).json({
      projects: FALLBACK_PROJECTS,
      lastUpdated: new Date().toISOString(),
      fallback: true,
      error: "Failed to fetch from GitHub API",
    });
  }
}
