import React, { useRef } from 'react'
import { connectSocket } from "../../utils/SocketConnect";
import './FenceAlert.css'


function FenceAlert() {

  const socketRef = useRef()
  const startFenceAlert = () => {
    socketRef.current = connectSocket()

    socketRef.current.on("live_location", ({ liveLocStatus, username }) => {
      console.log(liveLocStatus + " " + username)
    });

  }

  const stopFenceAlert = () => {
    socketRef.current.disconnect()
    console.log("stopped")
  }

  return (
    <div>
      <h1>Fence Alert</h1>
      <button onClick={startFenceAlert}>Start</button>
      <br />
      <br />
      <br />
      <button onClick={stopFenceAlert}>Stop</button>
    </div>
  )
}

export default FenceAlert
