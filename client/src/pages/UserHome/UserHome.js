import React, { useState, useRef, useEffect } from "react";
import GLOBE from "vanta/dist/vanta.waves.min";
import * as THREE from "three";
import Lottie from "react-lottie";
import astronot from "../../assets/astronaut.json";
import { useNavigate } from "react-router-dom";
import "./UserHome.css";

function UserHome() {
  const navigate = useNavigate();

  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        GLOBE({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 100.0,
          minWidth: 100.0,
          scale: 0.9,
          scaleMobile: 1.0,
          color: 0x30310,
        })
      );
    }
  }, [vantaEffect]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: astronot,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const navToSender = () => {
    navigate("/senderverify");
  };

  const navToReceiver = () => {
    navigate("/fencecreate");
  };

  return (
    <div
      ref={vantaRef}
      style={{
        width: "100%",
        height: "92vh",
        display: "flex",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <div className="homeContainer" >
        <div className="home-left-column">
          <Lottie options={defaultOptions} height={450} width={450} />
        </div>
        <div class="home-right-column leftelement">
          <h2 class="home-right-heading">
            <span>Choose</span> Your <span>Role</span>
          </h2>
          <p class="home-right-paragraph">
            Geofencing technology has revolutionized the way we interact with
            our surroundings, providing a powerful tool to stay safe and secure
            in an increasingly dynamic world.
          </p>

          <button class="home-btn home-success" onClick={navToSender}>
            Sender
          </button>
          <button class="home-btn home-info" onClick={navToReceiver}>
            Receiver
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
