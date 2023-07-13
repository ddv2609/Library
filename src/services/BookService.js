import { deleteComment, editComment, getBookInfo, patchCart, patchRate } from "../utils";

export const getBookDetail = async (ID, uid) => {
  const [book, comments, rates, { books }] = await getBookInfo(
    `books/${ID}`, 
    `comments/${ID}`, 
    `rates/${ID}`, 
    `carts/${uid}`
  );
  return [book, comments, rates, { books }];
}

export const patchBookRate = async (ID, bookData, rateData) => {
  const [book, rate] = await patchRate(`books/${ID}`, bookData, `rates/${ID}`, rateData);
  console.log(book, rate);
  return [book, rate];
}

export const addBookInCart = async (uid, payload) => {
  const data = await patchCart(`carts/${uid}`, payload);
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