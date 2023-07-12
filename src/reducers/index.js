import userReducer from "./user";
import booksReducer from "./books";
import bookReducer from "./book";
import categoriesReducer from "./categories";
import booksInCartReducer from "./booksInCart";
import queryReducer from "./query";
import pageReducer from "./page";
import sortsReducer from "./sorts";
import cascaderValuesReducer from "./cascaderValues";
import cascaderOptionsReducer from "./cascaderOptions";
import cascaderSmallerValuesReducer from "./cascaderSmallerValues";
import searchReducer from "./search";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  userReducer,
  booksReducer,
  bookReducer,
  categoriesReducer,
  booksInCartReducer,
  queryReducer,
  pageReducer,
  sortsReducer,
  cascaderValuesReducer,
  cascaderOptionsReducer,
  cascaderSmallerValuesReducer,
  searchReducer
});

export default allReducers;