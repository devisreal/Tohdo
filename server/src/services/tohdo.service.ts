import { NewTohdo, Tohdo } from "@/types/tohdo";
import { tohdos } from "@/db/schema";
import { db } from "@/db";
import { eq as equals } from "drizzle-orm";

export const getUserTohdosService = async (
  userId: number,
): Promise<Tohdo[]> => {
  const groups = await db
    .select()
    .from(tohdos)
    .where(equals(tohdos.userId, userId));
  return groups;
};

export const createTohdoService = async (values: NewTohdo): Promise<Tohdo> => {
  //   const [group] = await db
  //     .insert(tohdoGroups)
  //     .values({
  //       groupName: values.title,
  //       userId: values.userId,
  //     })
  //     .returning();
  //   if (!group) {
  //     throw new Error("Failed to add group");
  //   }
  //   return group;
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
  groupId: number,
  userId: number,
): Promise<Tohdo> => {
  //   const group = await db.query.tohdoGroups.findFirst({
  //     where: and(
  //       equals(tohdoGroups.id, groupId),
  //       equals(tohdoGroups.userId, userId),
  //     ),
  //   });
  //   if (!group) throw new Error("Group not found or not yours");
  //   const [deletedGroup] = await db
  //     .delete(tohdoGroups)
  //     .where(
  //       and(equals(tohdoGroups.id, groupId), equals(tohdoGroups.userId, userId)),
  //     )
  //     .returning();
  //   return deletedGroup;
};
