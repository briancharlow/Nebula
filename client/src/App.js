import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/signup";
import SignIn from "./components/login";
import Home from "./components/home";
import CreateProfile from "./components/profile";
import CommentForm from "./components/CommentForm";
import LandingPage from "./components/landing";
import CenterOutlet from "./components/CenterOutlet";
import Notifications from "./components/Notifications";
import Settings from "./components/Settings";
import LogoutPopup from "./components/LogOutPopup";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home />}>
          {/* Render CenterOutlet by default */}
          <Route index element={<CenterOutlet />} />
          <Route path="/home/notifications" element={<Notifications />} />
          <Route path="/home/settings" element={<Settings />} />
          <Route path="/home/logout" element={<LogoutPopup />} />

        </Route>
        <Route path="/createprofile" element={<CreateProfile />} />
        <Route path="/comment" element={<CommentForm />} />
      </Routes>
    </Router>
  );
};

export default App;
