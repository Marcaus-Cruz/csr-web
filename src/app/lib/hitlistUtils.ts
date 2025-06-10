import type { Hitlist } from "../types/hitlist.types";
import pb from './pocketbase';

export const getUserHitlist = async (): Promise<Hitlist> => {
  console.log(`[hitlistUtils][getUserHitlist]`);

  const localHitlist = pb.authStore?.record?.hitlist ?? [];
  const userId = pb.authStore?.record?.id ?? "";

  if (userId) {
    const user = await pb.collection("users").getOne(userId);
    const dbHitlist = user.hitlist;

    return removeDuplicateHits([...localHitlist, ...dbHitlist]);
  }

  return removeDuplicateHits(localHitlist);
};

export const removeDuplicateHits = (hitlist: Hitlist) =>
  hitlist.filter(
    (o, index, arr) =>
      arr.findIndex((item) => JSON.stringify(item) === JSON.stringify(o)) ===
      index
  );
