import { db, booksRef } from "./module/firebaseconfiq.js";
import { onValue,set,push,} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-database.js";
import {Book} from "./module/classBook.js"


const content = document.querySelector("#content");

let books = [];


onValue(booksRef, (snapshot) => {
   const data = snapshot.val() 
   
    content.innerHTML = "";

    for (const key in data) {
    const book = new Book( 
        key,
        data[key].title, 
        data[key].author,
        data[key].image, 
        data[key].favorite
    )
    books.push({ key, book })
      book.render(content, db);
  }
  
});



const dataForm = document.querySelector("#bookForm");

dataForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = document.querySelector("#bookName").value.trim();
  const authorInput = document.querySelector("#bookAutor").value.trim();
  const imageInput = document.querySelector("#bookImage").value;

  const newBookRef = push(booksRef);
  const key = newBookRef.key;

  try {
    const book = new Book(key, nameInput, authorInput, imageInput);

    set(newBookRef,{
      title: nameInput,
      author: authorInput,
      image: imageInput,
      favorite: false,
    });
  console.log(book);
  
  } catch (error) {
    alert(error.message);
  }
});
