import { useState } from "react";
import { Link } from "react-router-dom";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";

const SignupForm = () => {
  const [auhtCredentials, setAuthCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

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
          Create a new account
        </h1>
        <p className="w-full text-center text-fuchsia-700 mt-2">
          Hello there! Get started with us to Chatversation
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 mt-5">
            <Input
              label="Name"
              type="text"
              onChange={(e) =>
                setAuthCredentials({
                  ...auhtCredentials,
                  name: e.target.value,
                })
              }
            />

            <Input
              label="Email"
              type="email"
              onChange={(e) =>
                setAuthCredentials({
                  ...auhtCredentials,
                  email: e.target.value,
                })
              }
            />

            <Input
              label="Password"
              type="password"
              onChange={(e) =>
                setAuthCredentials({
                  ...auhtCredentials,
                  password: e.target.value,
                })
              }
            />
            <Button type="submit" color="danger" className="w-full">
              Sign up
            </Button>
          </div>
        </form>

        <p className="text-center text-fuchsia-700 mt-2">
          Already have an account?
          <Link to="/sign-in" className="ml-1 font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
