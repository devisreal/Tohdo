import { NewTohdo, Tohdo } from "@/types/tohdo";
import { tohdos } from "@/db/schema";
import { db } from "@/db";
import { and, eq as equals } from "drizzle-orm";

export const getUserTohdosService = async (
  userId: number,
): Promise<Tohdo[]> => {
  const userTohdos = await db
    .select()
    .from(tohdos)
    .where(equals(tohdos.userId, userId));
  return userTohdos;
};

export const createTohdoService = async (values: NewTohdo): Promise<Tohdo> => {
  const [tohdo] = await db
    .insert(tohdos)
    .values({
      title: values.title,
      groupId: values.groupId,
      userId: values.userId,
    })
    .returning();
  if (!tohdo) {
    throw new Error("Failed to add new tohdo");
  }
  return tohdo;
};

export const updateTohdoService = async (
  userId: number,
  groupId: number,
  data: { name: string },
): Promise<Tohdo> => {
  //   const [updatedGroup] = await db
  //     .update(tohdoGroups)
  //     .set({ groupName: data.name })
  //     .where(
  //       and(equals(tohdoGroups.id, groupId), equals(tohdoGroups.userId, userId)),
  //     )
  //     .returning();
  //   if (!updatedGroup) {
  //     throw new Error("Group not found or unauthorized");
  //   }
  //   return updatedGroup;
};

export const deleteTohdoService = async (
  tohdoId: number,
  userId: number,
): Promise<Tohdo> => {
  const tohdo = await db.query.tohdos.findFirst({
    where: and(equals(tohdos.id, tohdoId), equals(tohdos.userId, userId)),
  });

  if (!tohdo) throw new Error("Tohdo not found or not yours");

  const [deletedTohdo] = await db
    .delete(tohdos)
    .where(and(equals(tohdos.id, tohdoId), equals(tohdos.userId, userId)))
    .returning();
  return deletedTohdo;
};
