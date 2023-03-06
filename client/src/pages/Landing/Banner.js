import React from 'react'
import { useEffect, useRef, useState } from "react";
import GLOBE from "../../../node_modules/vanta/dist/vanta.globe.min";
import * as THREE from "three";

const Banner = () => {

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
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 0.9,
          scaleMobile: 1.0,
          color: 0x6464e0,
          // color: 0x4e0eff,
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
      {/* <h1 style={{ color: "white", zIndex: "1000", marginTop: "-80px" }}>
          GeoFencing Pro
        </h1> */}
    </div>

  )
}

export default Banner
