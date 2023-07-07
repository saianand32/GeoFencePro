import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { PointInPolygonAlgorithm } from '../../utils/PointInPolygonAlgorithm'
import { setSafeStatusRoute } from '../../utils/APIRoutes'
import { connectSocket } from "../../utils/SocketConnect";
import './SendLocation.css'


function SendLocation() {

  const { fence } = useSelector((state) => state.FenceReducer)
  const [position, setPosition] = useState({ latitude: 13.129038502695508, longitude: 77.58700184674039 });
  const [watchId, setWatchId] = useState(null);
  const navigate = useNavigate()
  const socketRef = useRef()

  useEffect(() => {
    getCurrentPosition()
    if (fence.lat === -1 && fence.lon === -1) {
      setTimeout(() => {
        navigate('/senderverify')
      }, 1000)
    }
  }, [])

  const updateLocationStatus = (latitude, longitude) => {
    const curUser = JSON.parse(sessionStorage.getItem('curUser'))
    socketRef.current = connectSocket()
    const flag = PointInPolygonAlgorithm(latitude, longitude, fence.lat, fence.lon)

    axios.post(setSafeStatusRoute, {
      setStatus: flag
    },
      {
        headers: {
          'auth-token': sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY)
        }
      })
      .then((resp) => {
        if (resp.data.status) {
          socketRef.current.emit("send_live_location", { liveLocStatus: resp.data.liveLocStatus, username: curUser.username })
          console.log(resp.data)
        }
      })
      .catch(error => console.error(error));
  }


  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (newPosition) => {
          const { latitude, longitude } = newPosition.coords;
          setPosition({ latitude, longitude });
        },
        (error) => {
          console.log(error)
        }
      );
    }
  }

  const startLocationMonitor = () => {

    const newWatchId = navigator.geolocation.watchPosition(
      (newPosition) => {
        const { latitude, longitude } = newPosition.coords;
        setPosition({ latitude, longitude });
        updateLocationStatus(latitude, longitude)
        console.log(fence)
        console.log({ latitude, longitude })

      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true }
    );
    setWatchId(newWatchId);
  }


  const stopLocationMonitor = () => {
    socketRef.current.disconnect()
    navigator.geolocation.clearWatch(watchId);
    setWatchId(null);
  }


  return (
    <div>
      <p>Latitude: {position.latitude}</p>
      <p>Longitude: {position.longitude}</p>

      <button onClick={startLocationMonitor}>Start</button>
      <br />
      <br />
      <button onClick={stopLocationMonitor}>Stop</button>
    </div>
  )
}

export default SendLocation
