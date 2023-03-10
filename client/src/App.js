import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Hero from "./pages/Hero/Hero";
import {
  HomeRoute,
  LoginSignupRoute,
  CreateFenceRoute,
  AlertFenceRoute,
  SenderVerifyRoute,
  ReceiverVerifyRoute,
  SendLocationRoute,
} from "./utils/ProtectedRoutes";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import UserHome from "./pages/UserHome/UserHome";
import Sender from "./pages/ConnectionVerification/Sender/Sender";
import Receiver from "./pages/ConnectionVerification/Receiver/Receiver";
import CreateFence from "./pages/CreateFence/CreateFence";
import FenceAlert from "./pages/FenceAlert/FenceAlert";
import SendLocation from "./pages/SendLocation/SendLocation";

function App() {
  useEffect(() => {
    const threeScript = document.createElement("script");
    threeScript.setAttribute("id", "threeScript");
    threeScript.setAttribute(
      "src",
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"
    );
    document.getElementsByTagName("head")[0].appendChild(threeScript);
    return () => {
      if (threeScript) {
        threeScript.remove();
      }
    };
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route
          path="/login" element={<LoginSignupRoute component={Login} />} 
        />
        <Route
          path="/signup"
          element={<LoginSignupRoute component={Signup} />}
        />

        <Route
          path="/home" element={<HomeRoute component={UserHome} />} 
        />

        <Route
          path="/senderverify"
          element={<SenderVerifyRoute component={Sender} />}
        />
        <Route
          path="/receiververify"
          element={<ReceiverVerifyRoute component={Receiver} />}
        />

        <Route
          path="/fencecreate"
          element={<CreateFenceRoute component={CreateFence} />}
        />
        <Route
          path="/fencealert"
          element={<AlertFenceRoute component={FenceAlert} />}
        />

        <Route
          path="/sendLocation"
          element={<SendLocationRoute component={SendLocation} />}
        />

        <Route 
          path="/" element={<Hero/>} 
        />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
