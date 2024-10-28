import { useEffect, useRef, useState } from "react";
import { appwriteConfig, databases } from "../lib/appwrite/config";
import { AppwriteException, Query } from "appwrite";
import { toast } from "react-toastify";
import { Spinner } from "@nextui-org/react";

const CommunitiesList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isFetched = useRef(false);

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
          console.log("The response was: ", res);
          setIsLoading(false);
        })
        .catch((error: AppwriteException) => {
          setIsLoading(false);
          toast.error(error.message, { theme: "colored" });
        });

      isFetched.current = true;
    }
  }, []);

  if (isLoading) <Spinner />;

  return <div>Communities List</div>;
};

export default CommunitiesList;
