import { db } from "@/db";
import { tohdoGroups } from "@/db/schema";
import { TohdoGroup } from "@/types/groups";
import { NewTohdo } from "@/types/tohdo";
import { eq as equals } from "drizzle-orm";

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
  values: NewTohdo,
): Promise<TohdoGroup> => {
  const [group] = await db
    .insert(tohdoGroups)
    .values({
      groupName: values.title,
      userId: values.userId,
    })
    .returning();

  if (!group) {
    throw new Error("Failed to add group");
  }
  return group;
};

export const updateGroupService = async (groupId: string, data: any) => {
  // DB logic to update group
};

export const deleteGroupService = async (groupId: string) => {
  // DB logic to delete group
};

export const addTodoToGroupService = async (groupId: string, data: any) => {
  // DB logic to add todo to group
};
