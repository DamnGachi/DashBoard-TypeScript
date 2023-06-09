const chatsList = document.querySelector("#chats");

let savedId = "";

const chatUI = (chat) => {
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card card-body rounded-0 animate__animated animate__fadeInUp mb-2">
      <div class="d-flex justify-content-between">
          <h1 class="card-title h3">${chat.title}</h1>
          <div>
              <button class="btn btn-danger delete" data-id="${chat.id}">delete</button>
              <button class="btn btn-secondary join" data-id="${chat.id}">join</button>
          </div>
      </div>
      <p>${chat.description}</p>
  </div>
`;
  const btnDelete = div.querySelector(".delete");
  const btnJoin = div.querySelector(".join");

  btnDelete.addEventListener("click", () => deleteChat(btnDelete.dataset.id));

  btnJoin.addEventListener("click", () => {
    socket.emit("client:getchat", btnJoin.dataset.id);
  });

  return div;
};

const renderChats = (chats) => {
  savedId = "";
  chatsList.innerHTML = "";
  console.log(chats);
  chats.forEach((chat) => {
    chatsList.append(chatUI(chat));
  });
};

const appendChat = (chat) => {
  chatsList.append(chatUI(chat));
};
