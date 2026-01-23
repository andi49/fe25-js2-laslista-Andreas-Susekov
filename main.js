import { db, booksRef } from "./module/firebaseconfiq.js";
import { ref, onValue, update, remove, set, push} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-database.js";

const content = document.querySelector('#content')

class Book {
    #title
    #author
    #image
    constructor(title, author, image) {
        this.#title = title
        this.#author = author
        this.#image = image
    }

      toJSON() {
    return {
      title: this.#title,
      author: this.#author,
      image: this.#image
    }
  }
 }


onValue(booksRef, (snapshot) => {
    const data = snapshot.val()
      content.innerHTML = ''

    for(const key in data) {
  
        const book = data[key]

        const bookDiv = document.createElement('div')
        const title = document.createElement('h3')
        const author = document.createElement('p')
        const favoriteInput = document.createElement('input')
        const favoriteLabel = document.createElement('label')
        const imgOfBook = document.createElement('img')
        const deleteButton = document.createElement('button')


        favoriteInput.type = 'checkbox'
        favoriteInput.checked = book.favorite
      

        title.innerText = `Book name: ${book.title}`
        author.innerText = `Author: ${book.author}`


        favoriteLabel.innerText = 'Add to your favorite:'

        imgOfBook.src = `${book.image}`
        imgOfBook.classList.add('bookSize')


        deleteButton.innerText = 'Delte Book'


        bookDiv.append(title, author, imgOfBook, favoriteLabel, favoriteInput, deleteButton)
        content.appendChild(bookDiv)
        
         const bookRef = ref(db, '/books/' + key)

         favoriteInput.addEventListener('click', () => {   
         update(bookRef, {favorite: !book.favorite})})

         deleteButton.addEventListener('click', () => {
         remove(bookRef)})    
    }
   
})

        const dataForm = document.querySelector('#bookForm')
 
            dataForm.addEventListener('submit', (event) => {
            event.preventDefault();

           const nameInput = document.querySelector('#bookName').value.trim()
           const authorInput = document.querySelector('#bookAutor').value.trim()
           const imageInput = document.querySelector('#bookImage').value

           
           const newBookRef = push(booksRef)
           
           const book =  new Book(nameInput, authorInput, imageInput)

            set(newBookRef, book.toJSON(), {
                title: nameInput,
                author: authorInput,
                image: imageInput,
                favorite: false,
               })
            
            console.log(book)
    })

