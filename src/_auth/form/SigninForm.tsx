import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppwriteException } from "appwrite";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";

import { account } from "../../lib/appwrite/config";
import { userStore } from "../../lib/zustand/userStore";
import { validateEmail } from "../../lib/utils";

const SigninForm = () => {
  const navigate = useNavigate();
  const [auhtCredentials, setAuthCredentials] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const userSessionState = userStore();

  const togglePasswordVisibility = () => {
    setIsVisible(!isVisible);
  };

  const isInvalid = useMemo(() => {
    if (auhtCredentials.email === "") return false;

    return validateEmail(auhtCredentials.email) ? false : true;
  }, [auhtCredentials.email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const promise = account.createEmailPasswordSession(
      auhtCredentials.email,
      auhtCredentials.password
    );

    promise
      .then((res) => {
        setIsLoading(false);

        userSessionState.updateUserSession(res);
        toast.success("Sign in successful", { theme: "colored" });
        navigate("/");
      })
      .catch((error: AppwriteException) => {
        setIsLoading(false);
        toast.error(error.message, { theme: "colored" });
      });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-[23rem] sm:max-w-[32rem] p-4 rounded-md shadow-xl shadow-rose-400 bg-fuchsia-200">
        <div className="flex items-center justify-center gap-3">
          <img
            src="/assets/images/chat-logo.png"
            alt="Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full"
          />
          <span className="text-2xl sm:text-4xl font-bold text-fuchsia-500">
            Chatversation
          </span>
        </div>

        <h1 className="w-full text-center text-xl sm:text-2xl font-bold pt-2 sm:pt-5">
          Log in to your account
        </h1>
        <p className="w-full text-center text-fuchsia-700 mt-2">
          Welcome back to Chatversation! Please enter your details
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 mt-5">
            <Input
              label="Email"
              value={auhtCredentials.email}
              type="email"
              onChange={(e) =>
                setAuthCredentials({
                  ...auhtCredentials,
                  email: e.target.value,
                })
              }
              isInvalid={isInvalid}
              className={
                isInvalid
                  ? "border-red-500 border-2 rounded-2xl"
                  : "border-2 border-transparent rounded-2xl"
              }
            />
            <Input
              label="Password (min 8 char)"
              type={isVisible ? "text" : "password"}
              onChange={(e) =>
                setAuthCredentials({
                  ...auhtCredentials,
                  password: e.target.value,
                })
              }
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={togglePasswordVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-eye"
                    >
                      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-eye-off"
                    >
                      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                      <path d="m2 2 20 20" />
                    </svg>
                  )}
                </button>
              }
            />
            <Button
              type="submit"
              color="danger"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>
        <p className="text-center text-fuchsia-700 mt-2">
          Don't have an account?
          <Link to="/sign-up" className="ml-1 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SigninForm;
