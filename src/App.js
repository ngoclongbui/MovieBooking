import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { PAGES } from "./util/settings/config";
import LoginTemplate from "./templates/LoginTemplate/LoginTemplate";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Profile from "./pages/Profile/Profile";
import Detail from "./pages/Detail/Detail";
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import Checkout from "./pages/Checkout/Checkout";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import ListFilms from "./pages/Admin/Films/ListFilms";
import DetailFilm from "./pages/Admin/Films/DetailFilm";
import ShowTime from "./pages/Admin/Films/ShowTime";
import ListUser from "./pages/Admin/Users/ListUser";
import DetailUser from "./pages/Admin/Users/DetailUser";
import NoMatch from "./pages/NoMatch/NoMatch";
import Loading from "./components/Loading/Loading";

function App() {
  return (
    <BrowserRouter>
      <Loading />
      <Routes>
        <Route path={PAGES.INDEX} element={<HomeTemplate />}>
          <Route index element={<Home />} />
          <Route path={PAGES.CONTACT} element={<Contact />} />
          <Route path={PAGES.NEWS} element={<News />} />
          <Route path={PAGES.PROFILE} element={<Profile />} />
          <Route path={PAGES.DETAIL}>
            <Route path=":id" element={<Detail />} />
          </Route>
        </Route>

        <Route element={<CheckoutTemplate />}>
          <Route path={PAGES.CHECK_OUT}>
            <Route path=":id" element={<Checkout />} />
          </Route>
        </Route>

        <Route element={<LoginTemplate />}>
          <Route path={PAGES.SIGN_IN} element={<SignIn />} />
          <Route path={PAGES.SIGN_UP} element={<SignUp />} />
        </Route>

        <Route path={PAGES.ADMIN} element={<AdminTemplate />}>
          <Route index element={<ListFilms />} />
          <Route path={PAGES.LIST_FILMS} element={<ListFilms />} />
          <Route path={PAGES.DETAIL_FILM} element={<DetailFilm />}>
            <Route path=":id" element={<DetailFilm />} />
          </Route>
          <Route path={PAGES.SHOWTIME}>
            <Route path=":id" element={<ShowTime />} />
          </Route>
          <Route path={PAGES.LIST_USERS} element={<ListUser />} />
          <Route path={PAGES.DETAIL_USER} element={<DetailUser />}>
            <Route path=":account" element={<DetailUser />} />
          </Route>
        </Route>

        <Route path={PAGES.ERROR} element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
