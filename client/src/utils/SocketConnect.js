import io from "socket.io-client";

export const connectSocket = () => {
    return io(process.env.REACT_APP_SERVER_HOST, {
        query: { username: JSON.parse(sessionStorage.getItem('curUser')).username
         } 
    });
}