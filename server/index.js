const express = require('express')
const cors = require('cors')
const connectToMongo = require("./db");
const UserRoutes = require('./routes/UserRoutes')
const socket = require('socket.io')

const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());

// Available Routes
app.use("/api/auth", UserRoutes);

connectToMongo();

const server = app.listen(process.env.PORT, () => {
    console.log(`app listening on Port ${process.env.PORT}`)
})

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    }
});

io.on("connection", (socket) => {
    console.log(`User ${socket.handshake.query.username} connected.`)

    const username = socket.handshake.query.username;
    socket.join(username);

    socket.on("verify_key_true", (data) => {
        io.to(data.username).emit("key_verified", { username: data.username, status: true });
    });


    socket.on("send_live_location", (data) => {
        io.to(data.username).emit("live_location", { liveLocStatus: data.liveLocStatus, username: data.username });
    });

    socket.on("disconnect", () => {
        console.log(`User ${socket.handshake.query.username} disconnected.`);
    });
});
