import React, { useState, useEffect } from "react";
import { generateConnectionKeyRoute } from '../../../utils/APIRoutes'
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { connectSocket } from "../../../utils/SocketConnect";
import axios from "axios";
import "./Receiver.css";

function Receiver() {
  const [key, setKey] = useState("");
  const navigate = useNavigate();
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(process.env.REACT_APP_TIMER); // time in seconds
  const [keyFlag, setKeyFlag] = useState(false);
  const timeCheck = process.env.REACT_APP_TIMER;

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  };

  useEffect(() => {
    if (keyFlag) {
      toast.success("Connected successfully", toastOptions);
      setTimeout(() => {
        navigate('/fencealert');
      }, 1000);
    }
  }, [keyFlag]);

  useEffect(() => {
    let interval;
    if (running && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1);
        if (time <= 1) toast.error("Key Expired", toastOptions);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running, time]);

  const formattedTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    if (minutes == 0 && seconds == 0) toast.error("Key expired", toastOptions);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const generateKey = () => {
    const socket = connectSocket();
    axios.get(generateConnectionKeyRoute, {
      headers: {
        'auth-token': sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY)
      }
    })
      .then((resp) => {
        if (resp.data.status) {
          setKey(resp.data.connectionKey);
          socket.on("key_verified", ({ status }) => {
            if (status) {
              const curUser = JSON.parse(sessionStorage.getItem('curUser'));
              curUser.isReceiver = true;
              sessionStorage.setItem('curUser', JSON.stringify(curUser));
              setKeyFlag(true);
            }
          });
          setRunning(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const regenerateKey = async () => {
    await generateKey();
    setTime(timeCheck);
  };

  return (
    <div className="receiver-container">
      <div className="receiver-box">
        <ToastContainer />
        <h1 className="receiver-title">Reciever Verify</h1>
        {
          key && (
            <div className="key-box">
              <h2 className="receiver-key">{key}</h2>
            </div>
          )
        }
        <br />
        <br />
        <button className="receiver-button" onClick={generateKey}>Generate Key</button>
        <br />
        <br />
        <button className="receiver-regenerate-button" onClick={regenerateKey} style={{ display: `${time === 0 ? "" : "none"}` }}>Regenerate key</button>
        {time === 0 ? (
          <h1 className="receiver-title">Key Expired</h1>
        ) : (
          <h1 className="receiver-timer">{formattedTime()}</h1>
        )}
      </div>
    </div>
  );
}

export default Receiver;
