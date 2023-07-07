import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { addFenceRoute } from '../../utils/APIRoutes'
import axios from "axios";
import './CreateFence.css'

function CreateFence() {

  const [currentPosition, setCurrentPosition] = useState({ lat: 13.129397, lng: 77.587236 });
  const [triangleCoords, setTriangleCoords] = useState([]);
  const [loadPointer, setLoadPointer] = useState(false)
  const [fence, setFence] = useState({ latArr: [], lonArr: [] })
  const polypath = useRef(null);
  const navigate = useNavigate()

  const mapStyles = {
    height: "60vh",
    width: "86vw",
    border: "6px solid rgba(252, 125, 33, 1)",
    borderRadius: "10px"

  };

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }

  useEffect(() => {
    setTimeout(() => {
      setLoadPointer(true)
    }, 1000)
  }, [])


  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng })

    const latArr = fence.latArr.concat([lat]);
    const lonArr = fence.lonArr.concat([lng]);

    setFence({ latArr, lonArr })
    setTriangleCoords(triangleCoords.concat([{ lat, lng }]))
  };


  const createFence = async () => {
    console.log(typeof (fence.latArr[0]))
    const resp = await axios.post(addFenceRoute, {
      fenceLat: fence.latArr,
      fenceLon: fence.lonArr
    }, {
      headers: {
        'auth-token': sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY)
      }
    });

    if (resp.data.status) {
      const curUser = JSON.parse(sessionStorage.getItem('curUser'))
      toast.success("Fence created successfully", toastOptions)
      curUser.isFenceSet = true;
      sessionStorage.setItem('curUser', JSON.stringify(curUser))
      setTimeout(() => {
        navigate('/receiververify')
      }, 1500)
    }
  }

  const PolyPathLine = () => {
    console.log(fence)
    return (
      <div>
        <Polyline
          path={triangleCoords}
          strokeColor="#FF0000"
          strokeOpacity={0.3}
          strokeWeight={1}
          id="polypath"
          ref={polypath} />
      </div>
    )
  }

  return (
    <div className='fence-create-enclose'>
      <ToastContainer />
      <h1 className="create-fence-title">Customize Your GeoFence</h1>
      <div className="create-fence-container">
        <LoadScript googleMapsApiKey={process.env.REACT_APP_MAPS_API_KEY}>
          <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={currentPosition}>
          {
              loadPointer ?
                <Marker
                  position={currentPosition}
                  onDragEnd={(e) => onMarkerDragEnd(e)}
                  draggable={true} />
                :
                <></>
            }

            <PolyPathLine />
          </GoogleMap>
        </LoadScript>
      </div>
      <br />
      <br />
      <button className="create-fence-button" onClick={createFence}>Create Fence</button>
    </div>
  )
}

export default CreateFence
