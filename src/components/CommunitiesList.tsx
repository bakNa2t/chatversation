import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { appwriteConfig, databases } from "../lib/appwrite/config";
import { AppwriteException, Query } from "appwrite";
import { toast } from "react-toastify";

import { Button, Card, CardBody, Spinner } from "@nextui-org/react";
import ModalDeleteElement from "./ModalDeleteElement";

import { communityStore } from "../lib/zustand/communityStore";

const CommunitiesList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isFetched = useRef(false);

  const communityState = communityStore();

  useEffect(() => {
    if (!isFetched.current) {
      setIsLoading(true);

      databases
        .listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.communitiesCollectionId,
          [Query.select(["$id", "name", "desc"])]
        )
        .then((res) => {
          setIsLoading(false);
          communityState.addCommunities(res.documents);
        })
        .catch((error: AppwriteException) => {
          setIsLoading(false);
          toast.error(error.message, { theme: "colored" });
        });

      isFetched.current = true;
    }
  }, []);

  const handleDeleteCommunity = (id: string) => {
    databases
      .deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.communitiesCollectionId,
        id
      )
      .then(() => {
        communityState.deleteCommunity(id);
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
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {communityState.communities.length > 0 &&
          communityState.communities.map((community) => (
            <Card key={community.$id}>
              <CardBody>
                <h1 className="text-xl font-bold">{community.name}</h1>
                {community.desc ? (
                  <p className="p-2">All you want to know about developers</p>
                ) : (
                  <p className="p-2 text-fuchsia-500/60">
                    ☹ Can't find any desc
                  </p>
                )}
                <div className="flex justify-between items-center">
                  <Link to={`/chats/${community.$id}`}>
                    <Button
                      className="w-full sm:w-fit sm:max-w-max"
                      color="danger"
                    >
                      Join
                    </Button>
                  </Link>

                  <div className="flex items-center">
                    <Button isIconOnly variant="light" radius="full">
                      <img src="/assets/icons/edit.svg" alt="edit" />
                    </Button>

                    <ModalDeleteElement
                      handleDeleteElement={() =>
                        handleDeleteCommunity(community.$id)
                      }
                      nameElement="community"
                      btnStyles="w-10 h-10 min-w-0"
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
      </div>

      {communityState.communities.length === 0 && isLoading === false && (
        <div className="flex justify-center items-center flex-col h-[calc(100vh-20rem)]  md:h-[calc(100vh-15rem)]">
          <h1 className="text-xl md:text-2xl font-bold text-danger-400">
            No communities found
          </h1>
          <p className="text-sm md:text-lg text-violet-500/80">
            Create a new community for your chat
          </p>
        </div>
      )}
    </>
  );
};

export default CommunitiesList;
