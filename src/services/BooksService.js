import { del, get } from "../utils/request.js";

export const getBooksList = async () => {
  const data = await get("/books");
  return data;
}

export const delBook = async (book) => {
  const data = await del(`/delete-book/${book.bookcode}`, book);
  return data;
}