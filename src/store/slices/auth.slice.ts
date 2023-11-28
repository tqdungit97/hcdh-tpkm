import { StateCreator } from 'zustand';

export type AuthSlice = {
  accessToken?: string;
  refreshToken?: string;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  clearTokens: () => void;
};

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  token: undefined,
  refreshToken: undefined,
  setAccessToken: (accessToken: string) => set(() => ({ accessToken })),
  setRefreshToken: (refreshToken: string) => set(() => ({ refreshToken })),
  clearTokens: () => set(() => ({ accessToken: undefined, refreshToken: undefined })),
});
