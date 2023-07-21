import React from "react";
import SignUp from "./components/signup";
import SignIn from "./components/login";
import Home from "./components/home";
import CreateProfile from "./components/profile";
import CommentForm from "./components/CommentForm";
import LandingPage from "./components/landing";

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";


// create Router,route
const myRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/home" element={<Home />} />
      <Route path="/createprofile" element={<CreateProfile />} />
      <Route path="/comment" element={<CommentForm />} />

    </Route>
  )
);
const App = () => {
  return <RouterProvider router={myRouter} />;
};

export default App;
