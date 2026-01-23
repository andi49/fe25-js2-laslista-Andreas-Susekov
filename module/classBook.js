import { ref,update,remove,} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-database.js";

export class Book {
  #key;
  #title;
  #author;
  #image;
  #favorite;

  constructor(key, title, author, image, favorite) {
    this.#key = key;
    this.#title = title;
    this.#author = author;
    this.#image = image;
    this.#favorite = favorite;
  }

  render(content, db) {
    const bookDiv = document.createElement("div");
    const title = document.createElement("h3");
    const author = document.createElement("p");
    const image = document.createElement("img");
    const favoriteInput = document.createElement("input");
    const favoriteLabel = document.createElement("label");
    const deleteButton = document.createElement("button");

    bookDiv.classList.add("template");

    title.innerText = this.#title;

    author.innerText = `Author: ${this.#author}`;

    image.src = this.#image;
    image.classList.add("bookSize");

    favoriteInput.type = "checkbox";
    favoriteInput.checked = this.#favorite;
    favoriteLabel.innerText = "Add to favorite:";

    deleteButton.innerText = "Delete Book";

    bookDiv.append(title, author, image, favoriteLabel, favoriteInput, deleteButton, );
    content.appendChild(bookDiv);

    const bookRef = ref(db, "/books/" + this.#key);

    favoriteInput.addEventListener("change", () => {
      update(bookRef, { favorite: favoriteInput.checked });
    });

    deleteButton.addEventListener("click", () => {
      remove(bookRef);
      bookDiv.remove();
    });
    
  }
}
