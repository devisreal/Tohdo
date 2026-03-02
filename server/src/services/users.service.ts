import { db } from "@/db";
import { users } from "@/db/schema";
import { and, eq as equals, ne as notEqual, or } from "drizzle-orm";

export type UserProfile = {
  id: number;
  firstname: string | null;
  lastname: string | null;
  username: string;
  email: string;
  joinedAt: Date;
  profilePicture: string | null;
};

export type UpdateUserProfilePayload = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
};

export const getUserProfileService = async (
  userId: number,
): Promise<UserProfile> => {
  // Fetch only the fields needed by the frontend profile views.
  const [user] = await db
    .select({
      id: users.id,
      firstname: users.firstname,
      lastname: users.lastname,
      username: users.username,
      email: users.email,
      createdAt: users.created_at,
    })
    .from(users)
    .where(equals(users.id, userId));

  if (!user) {
    throw new Error("User not found");
  }

  // Keep the response model stable across GET and UPDATE profile endpoints.
  return {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
    joinedAt: user.createdAt,
    // Profile image uploads are not implemented yet, so this stays null
    // until that feature is added.
    profilePicture: null,
  };
};

export const updateUserProfileService = async (
  userId: number,
  values: UpdateUserProfilePayload,
): Promise<UserProfile> => {
  // Ensure no other user already owns the submitted username or email.
  // We exclude the current user id so they can keep existing values.
  const [conflictingUser] = await db
    .select({
      id: users.id,
    })
    .from(users)
    .where(
      and(
        notEqual(users.id, userId),
        or(
          equals(users.username, values.username),
          equals(users.email, values.email),
        ),
      ),
    )
    .limit(1);

  if (conflictingUser) {
    throw new Error("Username or email already in use");
  }

  // Update and return the latest profile fields in one round-trip.
  const [updatedUser] = await db
    .update(users)
    .set({
      firstname: values.firstname,
      lastname: values.lastname,
      username: values.username,
      email: values.email,
      updated_at: new Date(),
    })
    .where(equals(users.id, userId))
    .returning({
      id: users.id,
      firstname: users.firstname,
      lastname: users.lastname,
      username: users.username,
      email: users.email,
      createdAt: users.created_at,
    });

  if (!updatedUser) {
    throw new Error("User not found");
  }

  return {
    id: updatedUser.id,
    firstname: updatedUser.firstname,
    lastname: updatedUser.lastname,
    username: updatedUser.username,
    email: updatedUser.email,
    joinedAt: updatedUser.createdAt,
    profilePicture: null,
  };
};
