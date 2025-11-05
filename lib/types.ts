export interface ProjectData {
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

export interface GitHubProjectsResponse {
  projects: ProjectData[];
  lastUpdated: string;
  cached?: boolean;
  error?: string;
  fallback?: boolean;
  stale?: boolean;
}

export interface RateLimitInfo {
  limit: string | null;
  remaining: string | null;
  reset: string | null;
  used: string | null;
}
