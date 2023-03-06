import React from "react";
import "./Navbar.css";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [click, setClick] = useState(false);
    const container = useRef(null)
  
  
    const handleClick = () => setClick(!click);
  return (
    <nav className="navbar">
        <div className="nav-container">
        <div className="container" ref={container} ></div>
          <Link to="/"  className="nav-logo">
            GeoFence Pro
            {/* <i className="fas fa-code"></i> */}
          </Link>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
       
                <Link className="nav-item">
                 Username
                </Link>
                <Link to ='/login' className="nav-item">
                Login
                </Link>
                
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
  );
}

export default Navbar;
