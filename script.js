function initNoteApp() {
  const modalBtn = document.querySelector(".modal-btn")
  const notesArea = document.querySelector(".notes");
  const modal = document.querySelector(".modal");
  const addNoteBtn = document.querySelector(".add-note");
  const events = ["click", "touchstart"];
  const titleInput = document.querySelector(".title-input");
  const contentInput = document.querySelector(".content-input");

  window.addEventListener("load", lodadNotesFromLocalStorage);

  function openModal(event) {
    event.preventDefault();
    modal.classList.add("active");
    modal.addEventListener("click", closeModal);
  }

  function closeModal(event) {
    const cancelBtn = document.querySelector(".cancel");
    if (event.target === modal || event.target === cancelBtn) {
      titleInput.value = "";
      contentInput.value = "";
      modal.classList.remove("active");
    }
  }

  events.forEach((e) => {
    modalBtn.addEventListener(e, openModal);
  })

  function createNote(event) {
    event.preventDefault();

    if (titleInput.value !== "" && contentInput.value !== "") {
      const count = notesArea.children.length + 1;
      const note = createNoteElement(count, titleInput.value, contentInput.value);
      notesArea.append(note);

      saveNoteLocalStorage(count, titleInput.value, contentInput.value);

      titleInput.value = "";
      contentInput.value = "";
      modal.classList.remove("active");

      addDeleteEvent(note);
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

  function saveNoteLocalStorage(id, title, content) {
    if (typeof Storage !== "undefined") {
      const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];
      existingNotes.push({ id, title, content });
      localStorage.setItem("notes", JSON.stringify(existingNotes));
    } else {
      alert("LocalStorage is not supported in this browser");
    }
  }

  function removeNoteFromLocalStorage(noteId) {
    if (typeof Storage !== "undefined") {
      const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];
      const updateNotes = existingNotes.filter(note => note.id != noteId);
      localStorage.setItem("notes", JSON.stringify(updateNotes));
    } else {
      alert("LocalStorage is not supported in this browser");
    }
  }

  function lodadNotesFromLocalStorage() {
    if (typeof Storage !== "undefined") {
      const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];

      existingNotes.forEach((note) => {
        const noteElement = createNoteElement(note.id, note.title, note.content);
        notesArea.appendChild(noteElement);
        addDeleteEvent(noteElement);
      })
    }
  }

  function addDeleteEvent(noteElement) {
    const deleteButton = noteElement.querySelector(".delete-btn");
    events.forEach((event) => {
      deleteButton.addEventListener(event, () => {
        const noteId = noteElement.id;
        removeNoteFromLocalStorage(noteId);
        noteElement.remove();
      })
    })
  }

  events.forEach((e) => {
    addNoteBtn.addEventListener(e, createNote);
  })
}

initNoteApp();