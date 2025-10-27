import { db } from "@/db";
import { tohdoGroups } from "@/db/schema";
import { TohdoGroup } from "@/types/groups";
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

export const createGroupService = async (userId: number, data: any) => {
  // DB logic to create new group
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
