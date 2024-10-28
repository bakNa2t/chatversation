import { create } from "zustand";
import { Models } from "appwrite";
import { devtools } from "zustand/middleware";

type States = {
  chats: Array<Models.Document> | [];
};

type Actions = {
  addChat: (data: Models.Document) => void;
};

export const chatStore = create<States & Actions>()(
  devtools((set) => ({
    chats: [],
    addChat: (data: Models.Document) =>
      set((state) => ({
        chats: [data, ...state.chats],
      })),
  }))
);
