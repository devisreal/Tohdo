import { db } from "@/db";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { NewUser, User } from "@/types/user";
import { checkExistingUser } from "@/utils/helpers";
import { users } from "@/db/schema";
import { JwtPayload, LoginPayload } from "@/types/auth";
import { eq as equals } from "drizzle-orm";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;
const JWT_SECRET = process.env.JWT_SECRET ?? "";

type RegisterPromise = {
  user: User;
  token: string;
};

export const registerUserService = async (
  values: NewUser,
): Promise<RegisterPromise> => {
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

  const payload: JwtPayload = {
    sub: user.id.toString(),
    email: user.email,
    iss: "https://tohdo.herokuapp.com",
    aud: "https://tohdo.vercel.app",
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "30m",
  });

  return { user, token };
};

export const loginUserService = async (
  values: LoginPayload,
): Promise<string> => {
  const [user] = await db
    .select()
    .from(users)
    .where(equals(users.email, values.email));
  if (!user) throw new Error("Invalid credentials");

  const result = await bcrypt.compare(values.password, user.password);
  if (!result) throw new Error("Invalid credentials");

  const payload: JwtPayload = {
    sub: user.id.toString(),
    email: user.email,
    iss: "https://tohdo.herokuapp.com",
    aud: "https://tohdo.vercel.app",
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "30m",
  });

  return token;
};
