import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { AppwriteException, ID, Models } from "appwrite";
import { toast } from "react-toastify";

import { Input } from "@nextui-org/react";

import { userStore } from "../../lib/zustand/userStore";
import { appwriteConfig, databases } from "../../lib/appwrite/config";
import { chatStore } from "../../lib/zustand/chatStore";

const Chatbox = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const user = userStore(
    (state) => state.user
  ) as Models.User<Models.Preferences>;

  const chatState = chatStore();

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    databases
      .createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.chatboxesCollectionId,
        ID.unique(),
        {
          message: message,
          user_id: user.$id,
          community_id: id,
          name: user.name,
        }
      )
      .then((res) => {
        chatState.addChat(res);
        setMessage("");
      })
      .catch((error: AppwriteException) => {
        toast(error.message, { theme: "colored" });
      });
  };

  const handleFetchMessage = () => {
    setIsLoading(true);

    databases
      .listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.chatboxesCollectionId
      )
      .then((res) => {
        setIsLoading(false);

        chatState.addChats(res.documents);
      })
      .catch((error: AppwriteException) => {
        setIsLoading(false);
        toast.error(error.message, { theme: "colored" });
      });
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1 p-4 mb-20">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((row) =>
          row % 2 === 0 ? (
            <div className="flex justify-end mb-2" key={row}>
              <div className="bg-fuchsia-300 p-2 max-w-72 rounded-lg">
                <h1 className="font-bold text-xl">User name</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Vitae perferendis quibusdam accusamus voluptas quisquam
                  repellendus nostrum cumque necessitatibus totam blanditiis?
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-start mb-2" key={row}>
              <div className="bg-violet-300 p-2 max-w-72 rounded-lg">
                <h1 className="font-bold text-xl">User name</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                  tenetur, sunt asperiores necessitatibus libero voluptas.
                </p>
              </div>
            </div>
          )
        )}
      </div>

      {/* Input message block */}
      <div className="fixed p-4 bottom-0 left-0 right-0 bg-fuchsia-200">
        <form onSubmit={handleMessageSubmit}>
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              label="Type message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbox;
