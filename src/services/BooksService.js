import { getBooks, getHome } from "../utils";

export const getBooksByParams = async (params) => {
  const data = await getBooks(`books${params !== "" ? `?${params}` : params}`)
  return data;
}

export const getBooksInHome = async (pathRecommend, pathNewRelease) => {
  const [recommend, release] = await getHome(pathRecommend, pathNewRelease);
  return [recommend, release];
}