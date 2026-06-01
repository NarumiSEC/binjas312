import type { Session } from "next-auth";
import { auth } from "@/auth";

/** Never crash layout when auth env is misconfigured. */
export async function getSafeSession(): Promise<Session | null> {
  try {
    return (await auth()) ?? null;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[auth] getSafeSession:", error);
    }
    return null;
  }
}
