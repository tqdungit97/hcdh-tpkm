import { create, StoreApi } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthSlice, createAuthSlice } from './slices/auth.slice';

export type ApplicationStore = AuthSlice;

export const useApplicationStore = create<ApplicationStore>()(
  persist(
    (set, get, api): ApplicationStore => ({
      ...createAuthSlice(
        set as StoreApi<AuthSlice>['setState'],
        get as StoreApi<AuthSlice>['getState'],
        api as StoreApi<AuthSlice>,
      ),
    }),
    { name: 'aloxe-store' },
  ),
);
