import React, { Fragment } from "react";
import { Navigate } from "react-router-dom";

export const HomeRoute = ({ component: Component, ...props }) => {

  return (
    sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY) ? <Fragment> <Component {...props} /> </Fragment> : <Navigate to="/" />
  );
};

export const LoginSignupRoute = ({ component: Component, ...props }) => {

  return (
    sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY) ? <Navigate to="/home" /> : <Fragment> <Component {...props} /> </Fragment>
  );
};


export const CreateFenceRoute = ({ component: Component, ...props }) => {
  return (
    sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY) ? <Fragment> <Component {...props} /> </Fragment> : <Navigate to="/home" />
  );
};

export const AlertFenceRoute = ({ component: Component, ...props }) => {
  const curUser = JSON.parse(sessionStorage.getItem('curUser'))
  const token = sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY)
  return (
    (token && (curUser.isReceiver ?? false)) ? <Fragment> <Component {...props} /> </Fragment> : <Navigate to="/home" />
  );
};


export const SenderVerifyRoute = ({ component: Component, ...props }) => {
  return (
    sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY) ? <Fragment> <Component {...props} /> </Fragment> : <Navigate to="/home" />
  );
};


export const ReceiverVerifyRoute = ({ component: Component, ...props }) => {
  const curUser = JSON.parse(sessionStorage.getItem('curUser'))
  const token = sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY)
  return (
    (token && (curUser.isFenceSet ?? false)) ? <Fragment> <Component {...props} /> </Fragment> : <Navigate to="/home" />
  );
};



export const SendLocationRoute = ({ component: Component, ...props }) => {
  const curUser = JSON.parse(sessionStorage.getItem('curUser'))
  const token = sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY)
  return (
    (token && (curUser.isSender ?? false)) ? <Fragment> <Component {...props} /> </Fragment> : <Navigate to="/home" />
  );
};




