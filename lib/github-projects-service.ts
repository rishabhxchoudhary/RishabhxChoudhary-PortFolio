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

interface GitHubProjectsResponse {
  projects: ProjectData[];
  lastUpdated: string;
  cached?: boolean;
  error?: string;
  fallback?: boolean;
  stale?: boolean;
}

export class GitHubProjectsService {
  private static cache: {
    data: ProjectData[] | null;
    timestamp: number;
  } = {
    data: null,
    timestamp: 0,
  };

  private static readonly CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

  public static async getProjects(): Promise<ProjectData[]> {
    const currentTime = Date.now();

    // Return cached data if available and fresh
    if (
      this.cache.data &&
      currentTime - this.cache.timestamp < this.CACHE_DURATION
    ) {
      console.log('Using cached GitHub projects data');
      return this.cache.data;
    }

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
                     (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

      const response = await fetch(`${baseUrl}/api/github-projects`, {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      if (!response.ok) {
        throw new Error(`GitHub projects API failed: ${response.status}`);
      }

      const data: GitHubProjectsResponse = await response.json();

      // Update cache
      this.cache = {
        data: data.projects,
        timestamp: currentTime,
      };

      console.log(`Fetched ${data.projects.length} projects from GitHub API`);
      return data.projects;
    } catch (error) {
      console.error('Failed to fetch GitHub projects:', error);

      // Return cached data if available, even if stale
      if (this.cache.data) {
        console.log('GitHub API failed, using stale cached data');
        return this.cache.data;
      }

      // Return empty array as fallback
      console.log('No cached data available, returning empty array');
      return [];
    }
  }

  public static async getProjectByName(name: string): Promise<ProjectData | null> {
    const projects = await this.getProjects();
    const normalizedName = name.toLowerCase().replace(/[\s-_]/g, '');

    const found = projects.find(project => {
      const projectTitleNormalized = project.title.toLowerCase().replace(/[\s-_]/g, '');
      const githubNameNormalized = project.github.toLowerCase().replace(/[\s-_]/g, '');

      return (
        projectTitleNormalized.includes(normalizedName) ||
        githubNameNormalized.includes(normalizedName) ||
        normalizedName.includes(projectTitleNormalized)
      );
    });

    if (found) {
      console.log(`Found project: ${found.title} for query: ${name}`);
    } else {
      console.log(`No project found for query: ${name}`);
    }

    return found || null;
  }

  public static async getProjectsByTechnology(tech: string): Promise<ProjectData[]> {
    const projects = await this.getProjects();
    const normalizedTech = tech.toLowerCase();

    const filtered = projects.filter(project =>
      project.technologies.some(technology =>
        technology.toLowerCase().includes(normalizedTech) ||
        normalizedTech.includes(technology.toLowerCase())
      )
    );

    console.log(`Found ${filtered.length} projects with technology: ${tech}`);
    return filtered;
  }

  public static async getFeaturedProjects(): Promise<ProjectData[]> {
    const projects = await this.getProjects();
    const featured = projects
      .filter(project => project.show !== false)
      .sort((a, b) => (a.priority || 999) - (b.priority || 999))
      .slice(0, 4); // Top 4 projects

    console.log(`Returning ${featured.length} featured projects`);
    return featured;
  }

  public static async getTopProjects(limit: number = 6): Promise<ProjectData[]> {
    const projects = await this.getProjects();
    const top = projects
      .filter(project => project.show !== false)
      .sort((a, b) => (a.priority || 999) - (b.priority || 999))
      .slice(0, limit);

    return top;
  }

  public static async searchProjects(query: string): Promise<ProjectData[]> {
    const projects = await this.getProjects();
    const normalizedQuery = query.toLowerCase();

    const results = projects.filter(project => {
      const titleMatch = project.title.toLowerCase().includes(normalizedQuery);
      const descriptionMatch = project.description.toLowerCase().includes(normalizedQuery);
      const techMatch = project.technologies.some(tech =>
        tech.toLowerCase().includes(normalizedQuery)
      );
      const readmeMatch = project.readmePreview?.toLowerCase().includes(normalizedQuery);

      return titleMatch || descriptionMatch || techMatch || readmeMatch;
    });

    console.log(`Search for "${query}" returned ${results.length} projects`);
    return results;
  }

  public static async getProjectStats(): Promise<{
    totalProjects: number;
    topTechnologies: { name: string; count: number }[];
    hasLiveProjects: number;
  }> {
    const projects = await this.getProjects();

    // Count technologies
    const techCount: Record<string, number> = {};
    projects.forEach(project => {
      project.technologies.forEach(tech => {
        techCount[tech] = (techCount[tech] || 0) + 1;
      });
    });

    // Sort technologies by usage
    const topTechnologies = Object.entries(techCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8)
      .map(([name, count]) => ({ name, count }));

    const hasLiveProjects = projects.filter(p => p.link).length;

    return {
      totalProjects: projects.length,
      topTechnologies,
      hasLiveProjects,
    };
  }

  // Helper method to clear cache (useful for development)
  public static clearCache(): void {
    this.cache = { data: null, timestamp: 0 };
    console.log('GitHub projects cache cleared');
  }

  // Helper method to get cache status
  public static getCacheStatus(): {
    hasData: boolean;
    age: number;
    isStale: boolean;
  } {
    const currentTime = Date.now();
    const age = this.cache.data ? currentTime - this.cache.timestamp : 0;
    const isStale = age > this.CACHE_DURATION;

    return {
      hasData: !!this.cache.data,
      age: Math.round(age / 1000), // age in seconds
      isStale,
    };
  }
}

export type { ProjectData, GitHubProjectsResponse };
