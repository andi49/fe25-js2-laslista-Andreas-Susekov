import { db, booksRef } from "./module/firebaseconfiq.js";
import { onValue,set,push,} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-database.js";
import {Book} from "./module/classBook.js"
import {sortBooks, sortAuthor, sortFavoriteFilter, newToldest} from "./module/filter.js"

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
      document.getElementById("sendButton").disabled = true;
      sortFavoriteFilter(books).forEach(item => item.book.render(content, db));
  } else {

     text.innerHTML = 'FAVORITE OFF'
     content.innerHTML = ''
     document.getElementById("sendButton").disabled = false;
     books.forEach(item => item.book.render(content, db));
  }
   
}) 

const filterButton = document.querySelector('#filter');
filterButton.selectedIndex = 0
let option = 'aa'

filterButton.addEventListener('click', () => {

  content.innerHTML = ''

  if(option === 'aa') {
    option = 'ab'
  } else {
    option = 'aa'
  }

  sortBooks(books, option)
  books.forEach(boken => {
    if(!toggle.classList.contains('active') || boken.book.favorite) {
      boken.book.render(content, db)
    }
  });
});



const filterButtonAuthor = document.querySelector('#authorFilter')
filterButtonAuthor.selectedIndex = 0
let optionTwo = 'bb'

filterButtonAuthor.addEventListener('click', () => {
 
  content.innerHTML = ''

  if(optionTwo === 'bb') {
    optionTwo = 'bc'
  } else {
    optionTwo = 'bb'
  }

 sortAuthor(books, optionTwo)
  books.forEach(boken => {
     if(!toggle.classList.contains('active') || boken.book.favorite) {
      boken.book.render(content, db)
    }

  });
});

const filterAge = document.querySelector('#filterAge')
let  optionThree = 'cc'

filterAge.addEventListener('click', () => {
content.innerHTML = ''

  if(optionThree === 'cc') {
    optionThree = 'cd'
  } else {
    optionThree = 'cc'
  }
 newToldest(books, optionThree)
  books.forEach(boken => {
     if(!toggle.classList.contains('active') || boken.book.favorite) {
      boken.book.render(content, db)
    }

  });
})

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
  
  sortBooks(books, option)
  sortAuthor(books, optionTwo)
  books.forEach(boken => boken.book.render(content, db))
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
