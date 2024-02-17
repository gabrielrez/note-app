function initNoteApp() {
  const modalBtn = document.querySelector(".modal-btn")
  const notesArea = document.querySelector(".notes");
  const notes = document.querySelectorAll(".note");
  const modal = document.querySelector(".modal");
  const addNoteBtn = document.querySelector(".add-note");
  const events = ["click", "toutchstart"];
  let count = 0;

  function openModal(event) {
    event.preventDefault();
    modal.classList.add("active");
    modal.addEventListener("click", closeModal);
  }

  function closeModal(event) {
    const cancelBtn = document.querySelector(".cancel");
    if (event.target == modal || event.target == cancelBtn) {
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
    if (titleInput.value != "" && contentInput.value != "") {
      ++count;
      const div = document.createElement("div");
      div.classList.add("note");
      div.id = count;
      div.innerHTML = `<h3 class="note-title">${titleInput.value}</h3>
      <p class="note-text">${contentInput.value}</p>
      <span class="delete-btn" id="${count}deleteButtom">Delete</span>`;
      notesArea.appendChild(div);
      titleInput.value = "";
      contentInput.value = "";
      modal.classList.remove("active");

      deleteNote(count);
    }
  }

  function deleteNote(id) {
    const noteToDelete = document.getElementById(id);
    const deleteButtom = noteToDelete.querySelector(".delete-btn");

    deleteButtom.addEventListener("click", () => {
      noteToDelete.remove();
    })
  }

  events.forEach((e) => {
    addNoteBtn.addEventListener(e, addNote);
  })
}

initNoteApp();