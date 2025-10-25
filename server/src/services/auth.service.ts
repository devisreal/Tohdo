import { db } from "@/db";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { NewUser, User } from "@/types/user";
import { checkExistingUser } from "@/utils/helpers";
import { users } from "@/db/schema";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

export const registerUserService = async (values: NewUser): Promise<User> => {
  const userExists = await checkExistingUser(values.username, values.email);
  if (userExists) throw new Error("User already exists");

  const salt_rouds = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(values.password, salt_rouds);

  const [user] = await db
    .insert(users)
    .values({
      username: values.username,
      email: values.email,
      password: hashedPassword,
    })
    .returning();
  if (!user) {
    throw new Error("User insert failed");
  }

  return user;
};

export const loginUserService = async () => {};
