import PocketBase from "pocketbase";
import { createStore } from "zustand";
import type { Hitlist } from "../types/hitlist.types";


const pb = new PocketBase("http://127.0.0.1:8090");

// --- Zustand store for reactive state ---
interface PBState {
  isLoggedIn: boolean;
  user: any;
  token: string;
  setUser: (user: any, token: string) => void;
  clearUser: () => void;
}

export const usePBStore = createStore<PBState>((set) => ({
  isLoggedIn: pb.authStore.isValid,
  user: pb.authStore.record,
  token: pb.authStore.token,
  setUser: (user, token) =>
    set({ user, token, isLoggedIn: true }),
  clearUser: () =>
    set({ user: null, token: "", isLoggedIn: false }),
}));

// --- Auth listener to keep store synced ---
pb.authStore.onChange(() => {
  const isLoggedIn = pb.authStore.isValid;
  const user = pb.authStore.record;
  const token = pb.authStore.token;

  if (isLoggedIn) {
    usePBStore.setState({ user, token, isLoggedIn });
  } else {
    usePBStore.setState({ user: null, token: "", isLoggedIn: false });
  }
});
export const COLLECTION_USER = pb.collection("users");

export const getLocalId = (): string => {
  return pb.authStore.record?.id ?? "";
};

export const getLocalHitlist = (): Hitlist => {
  return pb.authStore.record?.hitlist ?? [];
};

export const setLocalHitlist = (newHitlist: Hitlist): void => {
  if (pb.authStore.record) {
    pb.authStore.record.hitlist = newHitlist;
  }
};


export const clientIsLoggedIn = () => pb.authStore.isValid;

export default pb;