import {ref,update,remove,} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-database.js";
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
  //  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get

  get key() {
    return this.#key
  }

  get title() {
    return this.#title
  }

  get author() {
    return this.#author
  }

  get favorite() {
    return this.#favorite
  }

  render(content, db, toggle) {
    const bookDiv = document.createElement("div")
    const title = document.createElement("h3")
    const author = document.createElement("p")
    const image = document.createElement("img")
    const favoriteInput = document.createElement("input")
    const favoriteLabel = document.createElement("label")
    const deleteButton = document.createElement("button")

    bookDiv.classList.add("template")

    title.innerText = this.#title

    author.innerText = `Author: ${this.#author}`

    image.src = this.#image
    image.classList.add("bookSize")

    favoriteInput.type = "checkbox"
    favoriteInput.checked = this.#favorite
    favoriteLabel.innerText = "Add to favorite:"

    deleteButton.innerText = "Delete Book"
    deleteButton.id = "delete"

    bookDiv.append(
      title,
      author,
      image,
      favoriteLabel,
      favoriteInput,
      deleteButton,
    );
    content.appendChild(bookDiv)

    const bookRef = ref(db, "/books/" + this.#key);

    favoriteInput.addEventListener("change", async () => {
      try {
        await update(bookRef, { favorite: favoriteInput.checked });
        if (!favoriteInput.checked && toggle.classList.contains("active")) {
          bookDiv.remove()
        }
      } catch (error) {
        console.log("Couldnt favorite a book", error)
        alert("Something went wrong", error)
      }
    });

    deleteButton.addEventListener("click", async () => {
      try {
        await remove(bookRef)
        bookDiv.remove();
      } catch (error) {
        console.log("Couldnt remove a book", error)
        alert("Something went wrong", error)
      }
    });
  }
}
