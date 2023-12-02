import { StateCreator } from "zustand";
import { PostLoginResponse } from "../../api/auth";

export type AuthSlice = {
  auth?: PostLoginResponse;
  setAuth: (auth: PostLoginResponse) => void;
  clearAuth: () => void;
};

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  auth: undefined,
  setAuth: (auth: PostLoginResponse) => set(() => ({ auth })),
  clearAuth: () => set(() => ({ auth: undefined })),
});
