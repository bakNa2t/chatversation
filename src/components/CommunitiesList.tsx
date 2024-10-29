import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { appwriteConfig, databases } from "../lib/appwrite/config";
import { AppwriteException, Query } from "appwrite";
import { toast } from "react-toastify";

import { Button, Card, CardBody, Spinner } from "@nextui-org/react";

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
          [Query.select(["$id", "name"])]
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

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Spinner color="secondary" />
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {communityState.communities.length > 0 &&
        communityState.communities.map((community) => (
          <Card key={community.$id}>
            <CardBody>
              <h1 className="text-xl font-bold">{community["name"]}</h1>
              <p className="p-2">All you want to know about developers</p>
              <Link to={"/"}>
                <Button className="w-full sm:max-w-max" color="danger">
                  Join
                </Button>
              </Link>
            </CardBody>
          </Card>
        ))}
    </div>
  );
};

export default CommunitiesList;
