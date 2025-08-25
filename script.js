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

addBookToLibrary("12 Rules for life", "Jordan Peterson", 448, true);
addBookToLibrary("Factfulness", "Hans, Anna and Ola Rosling", 352, true);
addBookToLibrary("IT", "Stephen King", 1168, false);

console.log(myLibrary);

for (let book of myLibrary) {
  const newBook = document.createElement("div");
  newBook.classList.add("card");
  newBook.innerHTML = `
    <p>Title: ${book.title}</p>
    <p>Author: ${book.author}</p>
    <p>Pages: ${book.pages}</p>
    <p>${book.read ? "Already read" : "Not read yet"}</p>
  `;
  cards.appendChild(newBook);
}
