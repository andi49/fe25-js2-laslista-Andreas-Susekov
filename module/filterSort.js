// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
export function sortBooks(books, option) {
     books.sort((a, b) => {
        if (option === 'aa') return a.book.title.localeCompare(b.book.title, 'sv');
        else if(option === 'ab') return b.book.title.localeCompare(a.book.title, 'sv');
    });
}

export function sortAuthor(books, optionTwo){
    books.sort((a,b)=> {
        if (optionTwo === 'bb') return a.book.author.localeCompare(b.book.author, 'sv');
        else if(optionTwo === 'bc') return b.book.author.localeCompare(a.book.author, 'sv');
    })
}

export function newToldest(books, optionThree) {
    books.sort((a,b) => {
        if (optionThree === 'cc') return b.book.key.localeCompare(a.book.key);
        else if(optionThree === 'cd') return a.book.key.localeCompare(b.book.key);
    })
}

export function sortFavoriteFilter(books){
return books.filter(boken => boken.book.favorite)
}