import PocketBase from "pocketbase";
import type { Hitlist } from "../types/hitlist.types";

const client = new PocketBase("http://127.0.0.1:8090");

export const COLLECTION_USER = client.collection("users");

export const getLocalId = (): string => {
  return client.authStore.record?.id ?? "";
};

export const getLocalHitlist = (): Hitlist => {
  return client.authStore.record?.hitlist ?? [];
};

export const setLocalHitlist = (newHitlist: Hitlist): void => {
  if (client.authStore.record) {
    client.authStore.record.hitlist = newHitlist;
  }
};

export default client;
