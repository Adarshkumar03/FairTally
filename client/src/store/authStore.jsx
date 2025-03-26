import { create } from "zustand";
import { combine } from "zustand/middleware";

const useAuthStore = create(
  combine(
    {
      user: null,
    },
    (set) => ({
      login: (newUser) => set({ user: newUser }),
      logout: () => set({ user: null }),
    })
  )
);

export default useAuthStore;