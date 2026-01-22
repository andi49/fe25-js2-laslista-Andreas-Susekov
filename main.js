import { db, booksRef } from "./module/firebaseconfiq.js";
import { ref, onValue, update, remove, set, push} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-database.js";

const content = document.querySelector('#content')

// class Book {
//     #title
//     #author
//     #favorite
//     constructor(title, author, favorite) {
//         this.#title = title
//         this.#author = author
//         this.#favorite = favorite
//         this.img = img
//     }
// }


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
        const deleteButton = document.createElement('button')


        favoriteInput.type = 'checkbox'
        favoriteInput.checked = book.favorite
      

        title.innerText = `Book name: ${book.title}`
        author.innerText = `Author: ${book.author}`


        favoriteLabel.innerText = 'Add to your favorite:'


        deleteButton.innerText = 'Delte Book'


        bookDiv.append(title, author, favoriteLabel, favoriteInput, deleteButton)
        content.appendChild(bookDiv)
        
         const bookRef = ref(db, '/books/' + key)

         favoriteInput.addEventListener('click', () => {   
         update(bookRef, {favorite: !book.favorite})})

         deleteButton.addEventListener('click', () => {
         remove(bookRef) })    
    }
   
})

 const dataForm = document.querySelector('#bookForm')
 

    dataForm.addEventListener('submit', (event) => {
        event.preventDefault();

           const name = document.querySelector('#bookName').value.trim()
           const autor = document.querySelector('#bookAutor').value.trim()
           const favorite = document.querySelector('#bookFavorite').checked

           const newBookRef = push(booksRef)

            set(newBookRef,{
                author: autor,
                favorite: favorite,
                title: name
            })
    })
