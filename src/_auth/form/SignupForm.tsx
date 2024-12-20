import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppwriteException, ID } from "appwrite";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";

import { account } from "../../lib/appwrite/config";
import { validateEmail } from "../../lib/utils";

const SignupForm = () => {
  const navigate = useNavigate();
  const [auhtCredentials, setAuthCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

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

    const promis = account.create(
      ID.unique(),
      auhtCredentials.email,
      auhtCredentials.password,
      auhtCredentials.name
    );
    promis
      .then((res) => {
        if (!res) toast.error("Account creation failed", { theme: "colored" });
        setIsLoading(false);

        navigate("/sign-in");
        toast.success("Account created successfully, please sign in", {
          theme: "colored",
        });
      })
      .catch((error: AppwriteException) => {
        setIsLoading(false);
        toast.error(error.message, { theme: "colored" });
      });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="p-4 rounded-md shadow-xl shadow-rose-400 bg-fuchsia-200  dark:bg-stone-700">
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
          Create a new account
        </h1>
        <p className="max-w-[18rem] sm:min-w-[26rem] text-center text-fuchsia-700 dark:text-fuchsia-500 mt-2">
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
              isRequired
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
              isRequired
              isInvalid={isInvalid}
              className={
                isInvalid
                  ? "border-red-500 border-2 rounded-2xl"
                  : "border-2 border-transparent rounded-2xl"
              }
            />

            <Input
              label="Password"
              type={isVisible ? "text" : "password"}
              onChange={(e) =>
                setAuthCredentials({
                  ...auhtCredentials,
                  password: e.target.value,
                })
              }
              isRequired
              endContent={
                auhtCredentials.password.length > 0 && (
                  <button
                    className="focus:outline-none pb-[calc(0.5rem-1px)]"
                    type="button"
                    onClick={togglePasswordVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isVisible ? (
                      <img
                        src="/assets/icons/eye-off.svg"
                        alt="eye"
                        className="opacity-50"
                      />
                    ) : (
                      <img
                        src="/assets/icons/eye-on.svg"
                        alt="eye"
                        className="opacity-50"
                      />
                    )}
                  </button>
                )
              }
            />
            <Button
              type="submit"
              color="danger"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign up"}
            </Button>
          </div>
        </form>

        <p className="text-center text-fuchsia-700 dark:text-fuchsia-500 mt-2">
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
