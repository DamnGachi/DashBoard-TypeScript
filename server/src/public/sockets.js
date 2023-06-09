const socket = io.connect({
    extraHeaders: {
        Authorization: "Bearer token",
    },
});

const saveChat = (title, description) => {
    socket.emit("client:newchat", {
        title,
        description,
    });
};

const deleteChat = (id) => {
    socket.emit("client:deletechat", id);
};

const joinChat = (id) => {
    socket.emit("client:joinchat", {
        id,
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
