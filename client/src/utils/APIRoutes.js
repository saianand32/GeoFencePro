const host = process.env.REACT_APP_SERVER_HOST;

// login and signup routes
export const signupRoute = `${host}/api/auth/signup`; //post {auth: not required}
export const loginRoute = `${host}/api/auth/login`; //post {auth: not required}

//fence routes
export const addFenceRoute = `${host}/api/auth/addFence`; //post {auth: required}
export const getFenceRoute = `${host}/api/auth/getFence`; //get {auth: required}

//handshaking mechanism routes
export const validateConnectionRoute = `${host}/api/auth/validateConnection`; //post {auth: required}
export const generateConnectionKeyRoute = `${host}/api/auth/generateKey`; //get {auth: required}
export const getConnectionStatusRoute = `${host}/api/auth/getConnectionStatus`; //get {auth: required}
export const resetConnectionStatusRoute = `${host}/api/auth/resetStatus`; //post {auth: required}

// isSafe status fetch and set routes
export const getSafeStatusRoute = `${host}/api/auth/getSafeStatus`; //get {auth: required}
export const setSafeStatusRoute = `${host}/api/auth/setSafeStatus`; //post {auth: required}
