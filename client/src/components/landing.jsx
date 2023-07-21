import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import Likes from "../img/likes.jpg"
import Nebula from "../img/nebula2.png"
import Kid from "../img/kid.jpg"
import Selfie from "../img/selfie.jpg"
import Umbrella from "../img/umbrella.jpg"
import Logo from "../img/logo2.png"
import "../css/landing.css"; // You can create a custom CSS file for styling

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (remove this in your actual implementation)
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="nav">
        <div className="navbar-brand">
        <img src={Nebula} alt="logo" />    
        </div>

        <ul className="nav-links">
          <li>
            <Link to="/signin">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </nav>
     <div className="hero">
        <div className="hero-text">
            <h1>Welcome to Nebula Social Media</h1>
            <p>Connect with friends, share photos, and discover new worlds.</p>
        </div>
        <div className="hero-image">
            <img src={Logo} alt="Likes" />
        </div>
     </div>
     <div className="gallery">
        <div className="gallery-card one">
            <div className="profile">
                <img src={Kid} alt="profile" />
                <div className="profile-name">
                    <h3>Mark Wiliamson</h3>
                    <p>Photographer</p>
                </div>
                
            </div>
            <div className="review">
                <p>
                    "I've been using Nebula Social Media for the past few months, and it has completely changed the way I connect with my friends and family. The user-friendly interface makes it a breeze to share photos, videos, and updates. I love the privacy features that allow me to control who sees my posts. Nebula has become my go-to social media platform for staying connected with loved ones!"
                </p>
            </div>
            
        </div>
        <div className="gallery-card two">
            <div className="profile">
                <img src={Selfie} alt="profile" />
                <div className="profile-name">
                    <h3>Emily Smith</h3>
                    <p>Student</p>
                </div>
            </div>
            <div className="review">
                <p> 
                    "Nebula Social Media is the best social media app I've ever used. It strikes the perfect balance between staying connected with friends and maintaining a clutter-free feed. The app's thoughtful algorithm ensures that I see the most relevant posts from people I care about. Moreover, the ability to join niche communities and discover new interests has made my social media experience more enjoyable and meaningful. I'm addicted to Nebula!"
                </p>
            
            </div>
        </div>    
        <div className="gallery-card three">
            <div className="profile">
                <img src={Umbrella} alt="profile" />
                <div className="profile-name">
                    <h3>John Doe</h3>
                    <p>Software Engineer</p>
                </div>
            </div>
            <div className="review">
                <p>
                    "As a professional photographer, Nebula Social Media has been a game-changer for showcasing my work. The platform's image-centric design and high-quality image display make it perfect for sharing my photography portfolio with a wider audience. I've received great feedback and engagement from fellow photographers and art enthusiasts. I highly recommend Nebula for any creative looking to showcase their talent!"
                </p>
            </div>
        </div>  


     
        </div>
      {/* Main content */}
      <div className="content">
        {isLoading ? (
          // Show spinner while loading
          <div className="loading-spinner">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>
            
          </>
        )}

        {/* Social media icons */}
        <div className="social-icons">
          <FaInstagram className="icon" />
          <FaTwitter className="icon" />
          <FaFacebook className="icon" />
        </div>
      </div>
    </div>


  );
};

export default LandingPage;
