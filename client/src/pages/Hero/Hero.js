import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GLOBE from "vanta/dist/vanta.globe.min";
import * as THREE from "three";
import "./Hero.css";

const Landing = () => {
  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        GLOBE({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 0.9,
          scaleMobile: 1.0,
          color: 0x6464e0,
          backgroundColor: 0x30310,
        })
      );
    }
  }, [vantaEffect]);

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
      <div class="row">
        <div class="left-column">
          <h2 class="left-heading">
            <span>Welcome</span> to GeoFence<span>PRO</span>
          </h2>
          <p class="left-paragraph">
            Geofencing technology has revolutionized the way we interact with
            our surroundings, providing a powerful tool to stay safe and secure
            in an increasingly dynamic world.
          </p>
          <button
            class="btn success"
            onClick={() => {
              navigate("/login");
            }}
          >
            Get Started
          </button>
          <a href="https://github.com/saianand32/GeoFencePro" target="_blank"><button class="btn info">Github Repo</button></a>
        </div>
      </div>
    </div>
  );
};

export default Landing;
