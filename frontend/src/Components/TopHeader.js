import React from "react";
import { Link } from "react-router-dom";
import '../Styles/TopHeader.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

const TopHeader = () => {

  return (
    <div className="top-bar">
      <div className="top-bar-content">
        <div className="left-section">
          <span>Follow us on:</span>
          <a href="#"><i className="lab la-facebook"></i>Facebook</a>
          <a href="#"><i className="lab la-twitter"></i>Twitter</a>
          <a href="#"><i className="lab la-instagram"></i>Instagram</a>
          <a href="#"><i className="lab la-youtube"></i>YouTube</a>
        </div>
        <div className="right-section">
          
            <div className="user-info">
              
          
            </div>
        <Link to={"/login"}>
          <div className="login-btnn">
              <i className="las la-sign-in-alt"></i> Login
            </div>
            </Link>
            <span>or</span>
            <Link to={"SignUp"}>
          <div className="login-btnn">
            <i className="las la-user-plus"></i>Sign Up
          </div>
          </Link>
         
                
          
        </div>
      </div>
    </div>
  );
};

export default TopHeader;