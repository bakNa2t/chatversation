import { Models } from "appwrite";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type States = {
  userSession: Models.Session | object;
};

type Actions = {
  updateUserSession: (session: Models.Session) => void;
};

export const useStore = create<States & Actions>()(
  devtools((set) => ({
    userSession: {},
    updateUserSession: (session: Models.Session) =>
      set(() => ({
        userSession: session,
      })),
  }))
);
