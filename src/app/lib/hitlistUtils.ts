import type { Hitlist } from "../types/hitlist.types";
import { getUserById } from "./dynamoUsers";

export const getUserHitlist = async (userId: string): Promise<Hitlist> => {
  console.log(`[hitlistUtils][getUserHitlist]`, { userId });

  if (!userId) {
    return [];
  }

  try {
    const user = await getUserById(userId);
    return user?.hitlist || [];
  } catch (error) {
    console.error("Error getting user hitlist:", error);
    return [];
  }
};

export const removeDuplicateHits = (hitlist: Hitlist) =>
  hitlist.filter(
    (o, index, arr) =>
      arr.findIndex((item) => JSON.stringify(item) === JSON.stringify(o)) ===
      index
  );
