import { booksInCart, getDetail, save, upload } from "../utils/request";

export const getBookDetail = async (bookcode) => {
  const [items, image] = await getDetail(`/books/${bookcode}`, `/books/image/${bookcode}`);
  return [items, image];
}

export const saveBook = async (bookcode, book) => {
  const data = await save(`/books/new-book`, `/books/save/${bookcode}`, book, bookcode);
  return data;
}

export const uploadBookCover = async (book, image) => {
  const data = await upload(`/books/save/image/${book.bookcode}`, image);
  return data;
}

export const getAllBooksInCart = async (path, user_id) => {
  const data = await booksInCart(path, user_id);
  return data;
}