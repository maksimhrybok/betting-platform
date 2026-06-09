import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  email: string;
}

interface AuthStore {
  user: User | null;
  _hasHydrated: boolean;
  login: (email: string) => void;
  logout: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      _hasHydrated: false,
      login: (email) => set({ user: { email } }),
      logout: () => set({ user: null }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
