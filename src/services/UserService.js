import { changeUser, getUser, postUser } from "../utils"

export const getUserInfo = async (uid) => {
  const data = await getUser(`users/${uid}`);
  return data;
}

export const postUserInfo = async (payload) => {
  const data = await postUser("users", payload);
  return data;
}

export const changeUserInfo = async (uid, payload) => {
  const data = await changeUser(`users/${uid}`, payload);
  return data;
}