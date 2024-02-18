function initNoteApp() {
  const modalBtn = document.querySelector(".modal-btn")
  const notesArea = document.querySelector(".notes");
  const modal = document.querySelector(".modal");
  const addNoteBtn = document.querySelector(".add-note");
  const events = ["click", "touchstart"];

  function openModal(event) {
    event.preventDefault();
    modal.classList.add("active");
    modal.addEventListener("click", closeModal);
  }

  function closeModal(event) {
    const cancelBtn = document.querySelector(".cancel");
    if (event.target === modal || event.target === cancelBtn) {
      modal.classList.remove("active");
    }
  }

  events.forEach((e) => {
    modalBtn.addEventListener(e, openModal);
  })

  function addNote(event) {
    event.preventDefault();
    createNote();
  }

  function createNote() {
    const titleInput = document.querySelector(".title-input");
    const contentInput = document.querySelector(".content-input");

    if (titleInput.value !== "" && contentInput.value !== "") {
      const count = notesArea.children.length + 1;
      const note = createNoteElement(count, titleInput.value, contentInput.value);
      notesArea.append(note);

      titleInput.value = "";
      contentInput.value = "";
      modal.classList.remove("active");

      addDeleteEvent(count, note);
    } else {
      alert("Required Fields");
    }
  }

  function createNoteElement(id, title, content) {
    const div = document.createElement("div");
    div.classList.add("note");
    div.id = id;
    div.innerHTML = `<h3 class="note-title">${title}</h3>
    <p class="note-text">${content}</p>
    <span class="delete-btn" id="${id}deleteButton">Delete</span>`;
    return div;
  }

  function addDeleteEvent(id, noteElement) {
    const deleteButton = noteElement.querySelector(".delete-btn");
    events.forEach((event) => {
      deleteButton.addEventListener(event, () => {
        noteElement.remove();
      })
    })
  }

  events.forEach((e) => {
    addNoteBtn.addEventListener(e, addNote);
  })
}

initNoteApp();