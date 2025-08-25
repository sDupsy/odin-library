const myLibrary = [];
const cards = document.querySelector(".cards");

function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

Book.prototype.info = function() {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

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
      <p>Title: ${book.title}</p>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>${book.read ? "Already read" : "Not read yet"}</p>
      <button class="delete-button">Delete Book</button>
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

deleteBtn.addEventListener("click", () => {
  
});