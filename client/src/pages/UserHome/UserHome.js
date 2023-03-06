import React from 'react'
import { useNavigate } from 'react-router-dom'

function UserHome() {
  const navigate = useNavigate()
  const username = JSON.parse(sessionStorage.getItem('curUser')).username

  const navToSender = () => {
    navigate('/senderverify')
  }

  const navToReceiver = () => {
    navigate('/fencecreate')
  }

  return (
    <div>
      <h1>Hii {username ?? "bro"}</h1>
      <br />
      <br />
      <button onClick={navToSender}>Sender</button>
      <br />
      <br />
      <button onClick={navToReceiver}>Receiver</button>
    </div>
  )
}

export default UserHome
