import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import "../css/login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();
  const handleSignInClick = () => {
    navigate("/signin");
  };
  const backHome = () => {
    navigate("/");
  };
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [ContactNumber, setContactNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [c_password, setc_password] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Password !== c_password) {
      toast.error("Password and confirm Password do not match");
      return;
    }
    const registrationData = {
      fullname: Name,
      email: Email,
      phone_number: ContactNumber,
      password: Password,
      c_password: c_password,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        registrationData
      );
      console.log(response);
      if (response.status === 201) {
        toast.success("Sign Up Successful! Log in and explore the stars!");
        navigate("/signin");
      } else {
        toast.error("Enter Valid Details");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        console.error("No response from server:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div>
      <div className="backhome" onClick={backHome}>
        <BiArrowBack />
      </div>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <input
          type="text"
          placeholder="Name"
          className="input"
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="input"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          className="input"
          value={ContactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="input"
          value={c_password}
          onChange={(e) => setc_password(e.target.value)}
        />

        <button className="sign-btn">Sign Up</button>
        <p>
          Already have an account?{" "}
          <a href=" " onClick={handleSignInClick}>
            Sign In
          </a>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
