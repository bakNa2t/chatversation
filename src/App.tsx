import { Route, Routes } from "react-router-dom";

import AuthLayout from "./_auth/AuthLayout";
import SigninForm from "./_auth/form/SigninForm";
import SignupForm from "./_auth/form/SignupForm";
import PageNotFound from "./_root/pages/PageNotFound";

const App = () => {
  return (
    <main className="h-screen flex flex-col gap-4 justify-center items-center">
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
  );
};

export default App;
