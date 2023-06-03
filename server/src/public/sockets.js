const socket = io.connect();

const saveChat = (title, description) => {
  socket.emit("client:newchat", {
    title,
    description,
  });
};

const deleteChat = (id) => {
  socket.emit("client:deletechat", id);
};

const updateChat= (id, title, description) => {
  socket.emit("client:updatechat", {
    id,
    title,
    description,
  });
};

socket.on("server:loadchats", renderChats);

socket.on("server:newchat", appendChat);

socket.on("server:selectedchat", (chat) => {
  const title = document.getElementById("title");
  const description = document.getElementById("description");

  title.value = chat.title;
  description.value = chat.description;

  savedId = chat.id;
});
