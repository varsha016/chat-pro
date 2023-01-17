const http = require("http")
const express = require("express")
const cors = require("cors")
const socketIo = require("socket.io")
const app = express()
const port = 5000 || process.env.PORT;

const users = [{}]


app.use(cors())
app.get("/", (req, res) => {
    res.send("Hello It's Working")
})

const server = http.createServer(app)

const io = socketIo(server)


io.on("connection", (socket) => {
    console.log("New Connection");
    socket.on("joined", ({ user }) => {
        users[socket.id] = user
        console.log(`user is ${user}`);
        socket.emit(`wellcome`, { user: "Admin", message: `Wel-come to the chat ${users[socket.id]}` })
        socket.broadcast.emit("userjoined", { user: "Admin", message: `${users[socket.id]} has joined` })
    })

    socket.on("message", ({ message, id }) => {
        io.emit(`sendMessage`, { user: users[id], message, id });
    })

    socket.on(`disConnect`, () => {
        socket.broadcast.emit(`leave`, { user: "Admin", message: `user has left ${users[socket.id]}` })
        console.log("user Left");
    })
})
server.listen(port, () => {
    console.log(`server is Running on http://localhost:${port}`);
})