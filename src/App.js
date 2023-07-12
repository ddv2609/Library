import { BrowserRouter, Route, Routes } from "react-router-dom";

import Error404 from "./components/Error/Error404";
import LayoutDefault from "./pages/Layout/LayoutDefault";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Cart from "./pages/Cart/Cart";
import UserInfo from "./pages/UserInfo/UserInfo";
import Filter from "./pages/Filter/Filter";
import BookInfo from "./pages/BookInfo/BookInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<LayoutDefault />}>
            <Route index element={<Home />} />
            <Route path='cart' element={<Cart />} />
            <Route path='user-info' element={<UserInfo />} />
            <Route path='filter' element={<Filter />} />
            <Route path='book-info/:ID' element={<BookInfo />}/>
          </Route>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/*' element={<Error404 />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
