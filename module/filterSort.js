export function sortBooks(books, option) {

  const copy = [...books];

  return copy.sort((a, b) => {
    if (option === 'aa') return a.title.localeCompare(b.title, 'sv');
    if (option === 'ab') return b.title.localeCompare(a.title, 'sv');
  });
}
export function sortAuthor(copy, option){
  return  copy.sort((a,b)=> {
        if (option === 'bb') return a.author.localeCompare(b.author, 'sv');
        else if(option === 'bc') return b.author.localeCompare(a.author, 'sv');
    })
}

export function newToldest(copy, option) {
   return copy.sort((a,b) => {
        if (option === 'cc') return b.key.localeCompare(a.key);
        else if(option === 'cd') return a.key.localeCompare(b.key);
    })
}

export function sortFavoriteFilter(copy){
return copy.filter(boken => boken.favorite)
}