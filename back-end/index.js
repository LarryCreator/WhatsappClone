const express = require("express");
const app = express();
const server = require("http").createServer(app);
const socketio = require("socket.io");
const io = socketio(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});
const cors = require("cors");
const ioHandler = require("./routes/socketHandler");
app.use(cors());
app.use(require("./routes/models"));
ioHandler(io);
server.listen(4500, () => {
  console.log("Listening on port 4500");
});
