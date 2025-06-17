import type { Hitlist } from "../types/hitlist.types";
import { COLLECTION_USER, getLocalHitlist, getLocalId } from './pocketbaseClient';

export const getUserHitlist = async (): Promise<Hitlist> => {
  console.log(`[hitlistUtils][getUserHitlist]`);

  const localHitlist = getLocalHitlist();
  const userId = getLocalId();

  if (userId) {
    const user = await COLLECTION_USER.getOne(userId);
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
