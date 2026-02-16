export function bookFilter({books, content, db, toggle, sortBooks}) {

const filterButton = document.querySelector('#filter');
let option = 'aa'

filterButton.addEventListener('change', () => {
  content.innerHTML = ''
  if(option === 'aa') {
    option = 'ab'
  } else {
    option = 'aa'
  }

  const sortedBooks = sortBooks(books, option);
  
  sortedBooks.forEach(boken => {
    if(!toggle.classList.contains('active') || boken.favorite)
       {
      boken.render(content, db)
       }
  });
});

}

export function authorFilter({books, content, db, toggle, sortAuthor}) {

const filterButtonAuthor = document.querySelector('#authorFilter')
let optionTwo = 'bb'

filterButtonAuthor.addEventListener('change', () => {
 
  content.innerHTML = ''

  if(optionTwo === 'bb') {
    optionTwo = 'bc'
  } else {
    optionTwo = 'bb'
  }

 const sortedAuthor = sortAuthor(books, optionTwo)

  sortedAuthor.forEach(boken => {
     if(!toggle.classList.contains('active') | boken.favorite)
      {
      boken.render(content, db)
      }
  });
});
}

export function ageFilter({books, content, db, toggle, newToldest}) {

const filterAge = document.querySelector('#filterAge')
let  optionThree = 'cc'

filterAge.addEventListener('change', () => {
content.innerHTML = ''

  if(optionThree === 'cc') {
    optionThree = 'cd'
  } else {
    optionThree = 'cc'
  }
  
 const sortedNewTOOldest = newToldest(books, optionThree)
 
  sortedNewTOOldest.forEach(boken => {
     if(!toggle.classList.contains('active') | boken.favorite) 
      {
      boken.render(content, db)
      }

  });
})}