import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiLogOut } from 'react-icons/bi';

function Navbar() {
    const [click, setClick] = useState(false);
    const container = useRef(null)
    const [shown, setShown] = useState(false)
    const [username, setUsername] = useState("");
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
      const curUser = JSON.parse(sessionStorage.getItem('curUser'))??{username:""}
      if(curUser.username !== "") setShown(true)
      setUsername(curUser.username)
      console.log(sessionStorage.getItem('curUser'))
      
    }, [location.pathname])

    const handleLogout = () => {
      const obj={username:null}
      console.log(obj)
      sessionStorage.removeItem('curUser');
      sessionStorage.removeItem(process.env.REACT_APP_CLIENT_KEY);
      setShown(false)
      navigate('/login')
    }
  
  
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
       
                <div className="nav-item">
                 {username}
                </div>
                <div  onClick={handleLogout} className="logoutBtn" style={{display:`${shown?"":"none"}`}}>
                 <BiLogOut/>
                </div>
                 
                
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
  );
}

export default Navbar;
