import { db } from "@/db";
import { tohdoGroups } from "@/db/schema";
import { TohdoGroup, NewTohdoGroup } from "@/types/groups";
import { and, eq as equals } from "drizzle-orm";

export const getUserGroupsService = async (
  userId: number,
): Promise<TohdoGroup[]> => {
  const groups = await db
    .select()
    .from(tohdoGroups)
    .where(equals(tohdoGroups.userId, userId));
  return groups;
};

export const createGroupService = async (
  values: NewTohdoGroup,
): Promise<TohdoGroup> => {
  const [group] = await db
    .insert(tohdoGroups)
    .values({
      groupName: values.groupName,
      userId: values.userId,
    })
    .returning();

  if (!group) {
    throw new Error("Failed to add group");
  }
  return group;
};

export const updateGroupService = async (
  userId: number,
  groupId: number,
  data: { name: string },
): Promise<TohdoGroup> => {
  // * First alternative: Check if the group exist and belongs to the logged in user before updating
  /**
    const group = await db.query.tohdoGroups.findFirst({
      where: and(
        equals(tohdoGroups.id, groupId),
        equals(tohdoGroups.userId, userId),
      ),
    });

    if (!group) throw new Error("Group not found or not yours");

    await db
      .update(tohdoGroups)
      .set({ groupName: data.name })
      .where(equals(tohdoGroups.id, groupId));

    */

  // * Second alternative, do it all in one query
  const [updatedGroup] = await db
    .update(tohdoGroups)
    .set({ groupName: data.name })
    .where(
      and(equals(tohdoGroups.id, groupId), equals(tohdoGroups.userId, userId)),
    )
    .returning();

  if (!updatedGroup) {
    throw new Error("Group not found or unauthorized");
  }

  return updatedGroup;
};

export const deleteGroupService = async (
  groupId: number,
  userId: number,
): Promise<TohdoGroup> => {
  const group = await db.query.tohdoGroups.findFirst({
    where: and(
      equals(tohdoGroups.id, groupId),
      equals(tohdoGroups.userId, userId),
    ),
  });

  if (!group) throw new Error("Group not found or not yours");

  const [deletedGroup] = await db
    .delete(tohdoGroups)
    .where(
      and(equals(tohdoGroups.id, groupId), equals(tohdoGroups.userId, userId)),
    )
    .returning();

  return deletedGroup;
};

export const addTodoToGroupService = async (groupId: number, data: any) => {
  // DB logic to add todo to group
};
