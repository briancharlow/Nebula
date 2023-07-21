import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/login.css";

const SignIn = () => {
  const navigate = useNavigate();
  const handleSignUpClick = () => {
    navigate("/signup");
  };
  const backHome = () => {
    navigate("/");
  };
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  // No need to call toast.configure(), just import toast from react-toastify

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      email: Email,
      password: Password,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        loginData,
        { withCredentials: true }
      );
      console.log(response);
      if (response.data.success) {
        // Login successful, navigate to home page
        if (!response.data.profile) {
          navigate("/createprofile");
        } else {
          navigate("/home");
        }
        toast.success("Login successful!");
      } else {
        // Handle login failure
        toast.error("Login Failed. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        console.error("No response from server:", error.request);
      } else {
        console.error("Error:", error.message);
      }
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <div className="backhome" onClick={backHome}>
        <BiArrowBack />
      </div>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          className="input-box"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-box"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="sign-btn">Sign In</button>
        <p>
          Don't have an account?{" "}
          <a href=" " onClick={handleSignUpClick}>
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
