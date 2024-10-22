import { Button } from "@nextui-org/react";

const App = () => {
  return (
    <div className="h-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="flex justify-center items-center text-6xl">
        Wellcome to{" "}
        <em className="ml-2">
          <strong> Chatversation</strong>
        </em>
      </h1>

      <Button size="lg" color="primary">
        Get Started
      </Button>
    </div>
  );
};

export default App;
