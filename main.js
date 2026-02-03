import {db, booksRef} from "./module/firebaseconfiq.js";
import {onValue,set,push} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-database.js";
import {Book} from "./module/classBook.js"
import {bookFilter, authorFilter, ageFilter} from "./module/filterFunction.js";
import {sortBooks, sortAuthor, sortFavoriteFilter, newToldest} from "./module/filterSort.js"

const content = document.querySelector("#content");
let books = [];

/// shoutout to this guy https://dev.to/asapsonter/simple-toggle-buttononoff-3k2i
const toggle = document.querySelector('.toggle')
const text = document.querySelector('.text')
const animate = document.querySelector('#animate')

animate.addEventListener('click', () => {
  toggle.classList.toggle('active')

  if(toggle.classList.contains('active')){ 
      text.innerHTML = 'FAVORITE ON'
      content.innerHTML = ''
      document.querySelector("#sendButton").disabled = true;
      sortFavoriteFilter(books).reverse().forEach(boken => boken.book.render(content, db,toggle));
  } else {

     text.innerHTML = 'FAVORITE OFF'
     content.innerHTML = ''
     document.getElementById("sendButton").disabled = false;
     books.forEach(boken => boken.book.render(content, db,toggle));
  }
   
}) 

bookFilter({books, content, db, toggle, sortBooks})

authorFilter({books, content, db, toggle, sortAuthor})

ageFilter({books, content, db, toggle, newToldest})

onValue(booksRef, (snapshot) => {
   const data = snapshot.val() 
   
    content.innerHTML = ''
    books.length = 0
    
    for (const key in data) {
    const book = new Book( 
        key,
        data[key].title, 
        data[key].author,
        data[key].image, 
        data[key].favorite
      )
    books.push({ key, book })

  }
  if (toggle.classList.contains('active')) {
    console.log( books)
    books.filter(bok => bok.book.favorite).forEach(bok => bok.book.render(content, db, toggle));
  } else {
    books.forEach(bok => bok.book.render(content, db, toggle));
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
