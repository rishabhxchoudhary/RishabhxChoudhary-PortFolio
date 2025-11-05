import type { NextApiRequest, NextApiResponse } from "next";

interface RateLimitResponse {
  core: {
    limit: number;
    remaining: number;
    reset: number;
    used: number;
    resetDate: string;
  };
  authenticated: boolean;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RateLimitResponse>
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      core: { limit: 0, remaining: 0, reset: 0, used: 0, resetDate: "" },
      authenticated: false,
      error: "Method not allowed",
    });
  }

  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Portfolio-Website-RateLimit-Check",
    };

    const isAuthenticated = !!process.env.GITHUB_TOKEN;
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch("https://api.github.com/rate_limit", {
      headers,
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    const core = data.resources.core;

    const resetDate = new Date(core.reset * 1000).toISOString();

    res.status(200).json({
      core: {
        limit: core.limit,
        remaining: core.remaining,
        reset: core.reset,
        used: core.used,
        resetDate,
      },
      authenticated: isAuthenticated,
    });
  } catch (error) {
    console.error("Error fetching rate limit:", error);
    res.status(500).json({
      core: { limit: 0, remaining: 0, reset: 0, used: 0, resetDate: "" },
      authenticated: !!process.env.GITHUB_TOKEN,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
