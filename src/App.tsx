import { Route, Routes } from "react-router-dom";

import AuthLayout from "./_auth/AuthLayout";
import SigninForm from "./_auth/form/SigninForm";
import SignupForm from "./_auth/form/SignupForm";
import PageNotFound from "./_root/pages/PageNotFound";
import RootLayout from "./_root/RootLayout";
import Home from "./_root/pages/Home";
import Chatbox from "./_root/pages/Chatbox";

const App = () => {
  return (
    <main className="flex">
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/chats/:id" element={<Chatbox />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
  );
};

export default App;
