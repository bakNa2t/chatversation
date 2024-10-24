import { Button } from "@nextui-org/react";

const PageNotFound = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col bg-violet-200">
      <h1 className="text-3xl">
        The page you are looking for{" "}
        <span className="text-red-500 font-semibold">
          could not be found (404)
        </span>
      </h1>
      <p className="mt-4 text-lg font-semibold">
        Please, go back and check your route{" "}
      </p>
      <Button
        size="md"
        color="secondary"
        variant="ghost"
        className="mt-4 focus:ring-violet-500 text-xl font-semibold"
        onClick={() => window.history.back()}
      >
        Go Back
      </Button>
    </div>
  );
};

export default PageNotFound;
