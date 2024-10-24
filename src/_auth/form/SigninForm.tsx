const SigninForm = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-[32rem] p-4 rounded-md shadow-md">
        <div className="flex items-center justify-center gap-3">
          {/* <img
            src="/assets/images/logo-lifecrumbs.png"
            alt="Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 shadow-shd-logo rounded-full"
          /> */}
          <span className="text-3xl font-semibold">Chatversation</span>
        </div>
        <h1 className="text-2xl font-bold">Log in to your account</h1>
        <p className="small-medium text-light-3 md:base-regular">
          Welcome back to Chatversation! Please enter your details
        </p>
      </div>
    </div>
  );
};

export default SigninForm;
