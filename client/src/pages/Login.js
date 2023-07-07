import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GLOBE from "../../node_modules/vanta/dist/vanta.net.min";
import * as THREE from "three";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

function Login() {
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
          // color: 0x6464e0,
          color: 0x4e0eff,
          backgroundColor: 0x30310,
        })
      );
    }
  }, [vantaEffect]);

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { password, username } = values;

    const resp = await axios.post(loginRoute, {
      username,
      password,
    });

    const data = resp.data;
    const status = data.status ?? false;
    const error = data.msg ?? "internal server problem";

    if (status === false) {
      toast.error(error, toastOptions);
    }
    if (status === true) {
      sessionStorage.setItem(process.env.REACT_APP_CLIENT_KEY, data.authToken);
      const curUser = {
        username: data.username,
        isFenceSet: false,
        isSender: false,
        isReceiver: false,
      };
      sessionStorage.setItem("curUser", JSON.stringify(curUser));
      navigate("/home");
    }
  };

  return (
    <>
      <FormContainer
        ref={vantaRef}
        style={{
          width: "100%",
          height: "92vh",
          display: "flex",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <form
          onSubmit={(e) => {
            handleOnSubmit(e);
          }}
        >
          <div className="brand">
            {/* <img src={Logo} alt="" /> */}
            <h1>Login</h1>
          </div>

          <input
            type="text"
            placeholder="Enter username"
            name="username"
            onChange={(e) => handleOnChange(e)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={(e) => handleOnChange(e)}
          />
          <button type="submit">Login</button>
          <span>
            Not a member?? <Link to="/signup">Signup</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #030310;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #11111e;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Login;
