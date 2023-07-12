export const signIn = (payload) => {
  return {
    type: "SIGN_IN",
    payload
  }
}

export const signOut = () => {
  return {
    type: "SIGN_OUT"
  }
}

export const setRole = (role) => {
  return {
    type: "role",
    role: role
  }
}

export const getCategories = (categories) => {
  return {
    type: "get-categories",
    categories: categories
  }
}

export const getAllBooks = (books) => {
  return {
    type: "get-all-books",
    allBooks: books
  }
}

export const searchBook = (books, search) => {
  return {
    type: "search",
    books: books,
    search: search
  }
}

export const addBook = (book) => {
  return {
    type: "add-book",
    book: book
  }
}

export const delBookInState = (bookcode) => {
  return {
    type: 'delete-book',
    bookcode: bookcode
  }
}

export const changeBook = (book) => {
  return {
    type: 'change-book',
    book: book
  }
}

export const getBooksInCart = (books) => {
  return {
    type: 'get-books-in-cart',
    books: books
  }
}

export const delBookInCart = (bookcode) => {
  return {
    type: 'delete-book-in-cart',
    bookcode: bookcode
  }
}

export const changeBookInCart = (book) => {
  return {
    type: 'change-book-in-cart',
    book: book
  }
}

export const changeQuery = (query) => {
  return {
    type: "CHANGE_QUERY",
    payload: query
  }
}

export const changePage = (page) => {
  return {
    type: "CHANGE_PAGE",
    payload: page
  }
}

export const changeSorts = (sorts) => {
  return {
    type: "CHANGE_SORT",
    payload: sorts
  }
}

export const changeCascaderValues = (values) => {
  return {
    type: "CHANGE_VALUES",
    payload: values
  }
}

export const changeCascaderOptions = (options) => {
  return {
    type: "CHANGE_OPTIONS",
    payload: options
  }
}

export const changeCascaderSmallerValues = (values) => {
  return {
    type: "CHANGE_SMALLER_VALUES",
    payload: values
  }
}

export const changeSearch = (search) => {
  return {
    type: "SEARCH",
    payload: search
  }
}