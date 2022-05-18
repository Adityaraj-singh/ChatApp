const io = require("socket.io", { transports: ["websocket"] })(
  8900,
  {
    cors: {
      origin: "*",
      credentials: true,
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
    },
  },
  console.log("socket running")
);

let users = [];
const getUserfunc = (userId) => {
  return users.find((user) => {
    console.log(user.userId, userId, user.userId === userId);
    return user.userId === userId;
  });
};
const adduser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

//send Message

io.on("connection", (socket) => {
  //   console.log('a user is connected')
  // take userId and socketId

  socket.on("addUser", (userId) => {
    console.log("user", userId);
    adduser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, recieverId, text }) => {
    console.log("sending inside socked");
    const user = getUserfunc(recieverId);
    console.log("---->>??????????", recieverId, user.socketId, text);
    try {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
      console.log("running getMwssage emit");
    } catch (err) {
      console.log("-->>", err);
    }
  });

  /*   socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  }); */
});
