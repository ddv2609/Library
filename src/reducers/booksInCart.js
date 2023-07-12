const booksInCartReducer = (state = [], action) => {
  switch (action.type) {
    case 'get-books-in-cart':
      return action.books;
    case 'delete-book-in-cart':
      const newState = state.filter(book => book.bookcode !== action.bookcode);
      return newState;
    case 'change-book-in-cart':
      const changeState = state.map(item => item.bookcode === parseInt(action.book.book_id) ? {
        ...item, 
        quantity: action.book.quantity
      } : item);
      return changeState;
    default:
      return state;
  }
}

export default booksInCartReducer;