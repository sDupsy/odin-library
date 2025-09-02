const myLibrary = [];
const cards = document.querySelector(".cards");



class Book {
  constructor(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
  }
  
}

function addBookToLibrary(title, author, pages, read) {
  const id = crypto.randomUUID();
  const book = new Book(title, author, pages, read, id);
  myLibrary.push(book);
  return book;
}

function displayBooks () {
  cards.innerHTML=""
  for (let book of myLibrary) {
    const newBook = document.createElement("div");
    newBook.classList.add("card");
    newBook.innerHTML = `
    <p><span>Title:</span> ${book.title}</p>
    <p><span>Author:</span> ${book.author}</p>
    <p><span>Pages:</span> ${book.pages}</p>
    <button 
      class="read-button ${book.read ? "read" : "unread"}" 
      data-id="${book.id}">
      ${book.read ? "Read" : "Unread"}
    </button>
    <button class="delete-button" data-id="${book.id}">Delete Book</button>
  `;

    cards.appendChild(newBook);
  }
}



function isInLibrary(newBook) {
  return myLibrary.some((book) => book.title === newBook);
}
    


addBookToLibrary("12 Rules for life", "Jordan Peterson", 448, true);
addBookToLibrary("Factfulness", "Hans, Anna and Ola Rosling", 352, true);
addBookToLibrary("IT", "Stephen King", 1168, false);


displayBooks();


const showButton = document.querySelector(".showDialog");
const favDialog = document.querySelector(".favDialog");
const author = favDialog.querySelector("#author");
const title = favDialog.querySelector("#title");
const pages = favDialog.querySelector("#pages");
const read = favDialog.querySelector("#read");
const confirmBtn = favDialog.querySelector("#confirmBtn");
const cancelBtn = favDialog.querySelector("#cancelBtn");
const deleteBtn = document.querySelector(".delete-button")


showButton.addEventListener("click", () => {
  favDialog.showModal();
});

cancelBtn.addEventListener("click", () => {
  favDialog.close();
});


favDialog.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!isInLibrary(title.value)) {
    addBookToLibrary(title.value, author.value, pages.value, read.checked);
    displayBooks();
    favDialog.close();
    favDialog.querySelector("form").reset();
  }
  
});

cards.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-button")) {
    const bookId = e.target.getAttribute("data-id");
    const index = myLibrary.findIndex(book => book.id === bookId);
    if (index !== -1) {
      myLibrary.splice(index, 1);
      displayBooks();
    }
  }

  if (e.target.classList.contains("read-button")) {
    const bookId = e.target.getAttribute("data-id");
    const book = myLibrary.find(book => book.id === bookId);
    if (book) {
      book.read = !book.read; 
      displayBooks();   
    }
  }
});