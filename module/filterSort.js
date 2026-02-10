export function sortBooks(books, option) {
  books.sort((a, b) => {
    if (option === 'aa') return a.title.localeCompare(b.title, 'sv');
    if (option === 'ab') return b.title.localeCompare(a.title, 'sv');
  });
}

export function sortAuthor(books, option){
    books.sort((a,b)=> {
        if (option === 'bb') return a.author.localeCompare(b.author, 'sv');
        else if(option === 'bc') return b.author.localeCompare(a.author, 'sv');
    })
}

export function newToldest(books, option) {
    books.sort((a,b) => {
        if (option === 'cc') return b.key.localeCompare(a.key);
        else if(option === 'cd') return a.key.localeCompare(b.key);
    })
}

export function sortFavoriteFilter(books){
return books.filter(boken => boken.favorite)
}