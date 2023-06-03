const chatForm = document.querySelector("#chatForm");
const title = document.querySelector("#title");
const description = document.querySelector("#description");

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (savedId) {
    updateChat(savedId, title.value, description.value);
  } else {
    saveChat(title.value, description.value);
  }

  title.value = "";
  description.value = "";

  title.focus();
});
