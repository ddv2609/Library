const bookReducer = (state = [], action) => {
  switch (action.type) {
    case 'search':
      return action.books.filter(book =>
        book.title.toLowerCase().includes(action.search.toLowerCase()) ||
        book.author.toLowerCase().includes(action.search.toLowerCase())
      )
    case 'delete-book':
      const delState = state.filter((item) => item.bookcode !== parseInt(action.bookcode));
      return delState;
    case 'add-book':
      const addState = [...state, action.book];
      return addState;
    case 'change-book':
      const changeState = state.map((book) => book.bookcode !== action.book.bookcode ? book : action.book);
      return changeState;
    default:
      return state;
  }
}

export default bookReducer;