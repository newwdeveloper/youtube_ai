import Home from "./components/Home";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./components/ForgetPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetPassword" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Route>
    </Routes>
  );
}

export default App;
