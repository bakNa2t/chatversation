import { create } from "zustand";
import { Models } from "appwrite";
import { devtools } from "zustand/middleware";

type States = {
  communities: Array<Models.Document> | [];
};

type Actions = {
  addCommunity: (data: Models.Document) => void;
  addCommunities: (data: Array<Models.Document>) => void;
};

export const communityStore = create<States & Actions>()(
  devtools((set) => ({
    communities: [],

    addCommunity: (data: Models.Document) =>
      set((state) => ({
        communities: [data, ...state.communities],
      })),

    addCommunities: (data: Array<Models.Document>) =>
      set(() => ({
        communities: data,
      })),

    deleteChat: (id: string) => {
      set((state) => ({
        communities: state.communities.filter((item) => item.$id !== id),
      }));
    },
  }))
);
