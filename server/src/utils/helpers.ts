import { db } from "@/db";
import { and, eq as equals } from "drizzle-orm";
import { users } from "@/db/schema";

export async function checkExistingUser(
  username: string,
  email: string,
): Promise<boolean> {
  try {
    const result = await db
      .select()
      .from(users)
      .where(and(equals(users.username, username), equals(users.email, email)))
      .limit(1);
    return result.length > 0;
  } catch (error) {
    console.error("Error checking existing user:", error);
    throw error;
  }
}
