import { addIntoCart, deleteComment, editComment, getBookInfo, patchRate } from "../utils";

export const getBookDetail = async (ID, uid) => {
  const [book, comments, rates, { books }, users] = await getBookInfo(
    `books/${ID}`, 
    `comments/${ID}`, 
    `rates/${ID}`, 
    `carts/${uid}`
  );
  return [book, comments, rates, { books }, users];
}

export const patchBookRate = async (ID, bookData, rateData) => {
  const [book, rate] = await patchRate(`books/${ID}`, bookData, `rates/${ID}`, rateData);
  return [book, rate];
}

export const addBookInCart = async (uid, len, payload) => {
  const data = await addIntoCart(len > 0 ? `carts/${uid}` : "carts", len > 0 ? "PATCH" : "POST", payload);
  return data;
}

export const deleteCommentUser = async (ID, payload) => {
  const data = await deleteComment(`comments/${ID}`, payload);
  return data;
}

export const editCommentUser = async (ID, payload) => {
  const data = await editComment(`comments/${ID}`, payload);
  return data;
}