import SkillsResponse from "./Skill_Respose";

// Rate limiter - allows max 5 requests per second
class RateLimiter {
  private requests: number[] = [];
  private maxRequests = 5;
  private timeWindow = 1000; // 1 second

  async waitForSlot() {
    while (true) {
      const now = Date.now();
      // Remove requests older than timeWindow
      this.requests = this.requests.filter(
        (time) => now - time < this.timeWindow
      );

      if (this.requests.length < this.maxRequests) {
        // Slot available, add current request and return
        this.requests.push(now);
        return;
      }

      // Wait until the oldest request expires
      const oldestRequest = this.requests[0];
      const waitTime = this.timeWindow - (now - oldestRequest);

      if (waitTime > 0) {
        await delay(waitTime);
      } else {
        // If waitTime is 0 or negative, wait a small amount to avoid tight loop
        await delay(10);
      }
    }
  }
}

// Simple delay function
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const rateLimiter = new RateLimiter();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { job_role } = body;

    if (!job_role) {
      return Response.json(
        {
          success: false,
          message: "Job role not provided",
        },
        { status: 400 }
      );
    }

    // Wait for rate limiter slot
    await rateLimiter.waitForSlot();
    const result = await SkillsResponse(job_role);

    return Response.json(
      {
        success: true,
        Skillset: result,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("API Error:", error.message);
    return Response.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
