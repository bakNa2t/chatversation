import { Models } from "appwrite";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type States = {
  userSession: Models.Session | object;
};

type Actions = {
  updateUserSession: (session: Models.Session) => void;
};

export const useStore = create<States & Actions>()(
  devtools(
    persist(
      (set) => ({
        userSession: {},
        updateUserSession: (session: Models.Session) =>
          set(() => ({
            userSession: session,
          })),
      }),
      { name: "chatversation_user_store" }
    )
  )
);
