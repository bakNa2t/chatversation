import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";

const SigninForm = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-[32rem] p-4 rounded-md shadow-lg shadow-pink-300 bg-fuchsia-200">
        <div className="flex items-center justify-center gap-3">
          <img
            src="/assets/images/chat-logo.png"
            alt="Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full"
          />
          <span className="text-4xl font-bold text-fuchsia-500">
            Chatversation
          </span>
        </div>

        <h1 className="w-full text-center text-2xl font-bold pt-5">
          Log in to your account
        </h1>
        <p className="small-medium text-light-3 md:base-regular">
          Welcome back to Chatversation! Please enter your details
        </p>

        <form>
          <div className="grid grid-cols-1 gap-4 mt-5">
            <Input label="Email" type="email" />
            <Input label="Password" type="password" />
            <Button color="danger" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
