import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AppwriteException, ID, Models } from "appwrite";
import { toast } from "react-toastify";

import { Button, Input, Spinner } from "@nextui-org/react";
import ModalDeleteElement from "../../components/ModalDeleteElement";

import { userStore } from "../../lib/zustand/userStore";
import { chatStore } from "../../lib/zustand/chatStore";
import { appwriteConfig, client, databases } from "../../lib/appwrite/config";

const Chatbox = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const isFetched = useRef(false);

  const user = userStore(
    (state) => state.user
  ) as Models.User<Models.Preferences>;

  const chatState = chatStore();

  useEffect(() => {
    if (!isFetched.current) {
      handleFetchMessage();

      // synchronize in realtime
      client.subscribe(
        `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.chatboxesCollectionId}.documents`,
        (response) => {
          console.log("Response is ", response);
          const payload = response.payload as Models.Document;

          // verify db for new message
          if (
            response.events.includes(
              "databases.*.collections.*.documents.*.create"
            )
          ) {
            if (user.$id !== payload.user_id) {
              chatState.addChat(payload);
            }
          } else if (
            response.events.includes(
              "databases.*.collections.*.documents.*.delete"
            )
          ) {
            chatState.deleteChat(payload.$id);
          }
        }
      );

      isFetched.current = true;
    }
  }, []);

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

  const handleDeleteMessage = (id: string) => {
    databases
      .deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.chatboxesCollectionId,
        id
      )
      .then(() => {
        chatState.deleteChat(id);
      })
      .catch((error: AppwriteException) => {
        toast.error(error.message, { theme: "colored" });
      });
  };

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Spinner color="secondary" />
      </div>
    );

  return (
    <div className="flex flex-col">
      <div className="flex-1 p-4 mb-20">
        {chatState.chats.length > 0 &&
          chatState.chats.map((chat) =>
            chat.user_id === user.$id ? (
              <div className="flex justify-end mb-4" key={chat.$id}>
                <div className="flex flex-col">
                  <div className="shadow-lg shadow-fuchsia-400 bg-fuchsia-300 p-2 max-w-72 rounded-lg ">
                    <h1 className="font-bold text-xl">{chat.name}</h1>
                    <p>{chat.message}</p>
                  </div>

                  <div className="flex justify-end mt-2">
                    <ModalDeleteElement
                      handleDeleteElement={() => handleDeleteMessage(chat.$id)}
                      nameElement="message"
                      btnStyles="w-5 h-5 min-w-0"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-start mb-2" key={chat.$id}>
                <div className="shadow-lg shadow-violet-400 bg-violet-300 p-2 max-w-72 rounded-lg">
                  <h1 className="font-bold text-xl">{chat.name}</h1>
                  <p>{chat.message}</p>
                </div>
              </div>
            )
          )}
      </div>

      {/* Input message block */}
      <div
        className="p-8 bottom-0 left-0 right-0 bg-fuchsia-200 backdrop-blur-md bg-opacity-40 sm:w-[calc(100vw-20px)]"
        style={{ position: "fixed" }}
      >
        <form onSubmit={handleMessageSubmit}>
          <div className="flex items-center space-x-2 relative">
            <Input
              type="text"
              label="Type message..."
              value={message}
              onChange={(e) => setMessage(e.target.value.trim())}
            />

            {message && (
              <Button
                type="submit"
                variant="light"
                isIconOnly
                radius="full"
                className="absolute right-1 top-1/2 -translate-y-1/2"
              >
                <img
                  src="/assets/icons/send.svg"
                  alt="send"
                  className="cursor-pointer"
                />
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbox;
