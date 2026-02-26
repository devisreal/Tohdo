import { db } from "@/db";
import { eq as equals, or } from "drizzle-orm";
import { users } from "@/db/schema";

export async function checkExistingUser(
  username: string,
  email: string,
): Promise<boolean> {
  try {
    const result = await db
      .select()
      .from(users)
      .where(or(equals(users.username, username), equals(users.email, email)))
      .limit(1);
    return result.length > 0;
  } catch (error) {
    console.error("Error checking existing user:", error);
    throw error;
  }
}
