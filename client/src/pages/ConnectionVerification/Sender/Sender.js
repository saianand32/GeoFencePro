import React, { useState } from "react";
import { validateConnectionRoute, getFenceRoute } from '../../../utils/APIRoutes'
import { ToastContainer, toast } from "react-toastify";
import { connectSocket } from "../../../utils/SocketConnect";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFence } from "../../../redux/reducers/FenceReducer";
import axios from "axios";
import './Sender.css'

function Sender() {
  const [key, setKey] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }

  const validateKey = async () => {
    const socket = connectSocket()
    const resp = await axios.post(validateConnectionRoute, {
      connectionKey: key
    }, {
      headers: {
        'auth-token': sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY)
      }
    });
    if (resp.data.status ?? false) {
      const curUser = JSON.parse(sessionStorage.getItem('curUser'))
      curUser.isSender = true;
      sessionStorage.setItem('curUser', JSON.stringify(curUser))
      socket.emit("verify_key_true", {
        message: 'Hello, socket server!',
        username: curUser.username 
      });

      const resp = await axios.get(getFenceRoute, {
        headers: {
          'auth-token': sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY)
        }
      });
      if (resp.data.status ?? false) {
        const newFence = { lat: resp.data.fence.fenceLat, lon: resp.data.fence.fenceLon }
        dispatch(setFence(newFence))
        console.log(newFence)
        toast.success("Connected successfully", toastOptions)
        setTimeout(() => {
          navigate('/sendLocation')
        }, 1000)
      }
      else {
        toast.error("some error occoured", toastOptions)
      }
    }
    else {
      toast.error("inValid key", toastOptions);
    }
  }

  return (
    <div className="sender-container">
      <ToastContainer />
      <div className="sender-box">
      <h1 className="sender-title">Sender verify</h1>
      <br />
      <br />
      <input type="text" className="sender-input" onChange={(e) => setKey(e.target.value)} />
      <br />
      <br />
      <br />
      <button className="sender-button" onClick={validateKey}>Validate Key</button>
      </div>
    </div>
  )
}

export default Sender


