import { categories } from "../utils/request"

export const getAllCategories = async (path) => {
  const data = await categories(path);
  return data;
}