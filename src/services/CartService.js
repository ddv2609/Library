import { changeQuantity, deleteCart, getCart } from "../utils"

export const getBooksInCart = async (uid) => {
  const data = await getCart(`carts/${uid}`);
  return data;
}

export const deleteBookInCart = async (uid, payload) => {
  const data = await deleteCart(`carts/${uid}`, payload);
  return data;
}

export const changeQuantityBookInCart = async (uid, payload) => {
  const data = await changeQuantity(`carts/${uid}`, payload);
  return data;
}