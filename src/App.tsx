import React from "react";
import { useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { darkModeVar, isLoggedInVar } from "./apollo";
import Home from "./screen/Home";
import SignUp from "./screen/SignUp";
import Login from "./screen/Login";
import routes from "./screen/routes";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { GlobalStyle } from "./styles";
import Profile from "./screen/users/profile";
import Upload from "./screen/shops/upload";
import NotFoundPage from "./screen/NotFound";
import SearchItems from "./screen/shops/searchItems";
import EditProfile from "./screen/users/edit";
import AboutShop from "./screen/shops/aboutShop";
import EditShop from "./screen/shops/editShop";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const isDarkMode = useReactiveVar(darkModeVar);
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router>
        <Routes>
          {!isLoggedIn ? (
            <Route path={routes.home} element={<SignUp />} />
          ) : null}
          <Route
            path={routes.home}
            element={isLoggedIn ? <Home /> : <Login />}
          />
          <Route path={routes.login} element={<Login />} />
          <Route path="/users/profile/:id" element={<Profile />} />
          <Route path={routes.upload} element={<Upload />} />
          <Route path={routes.search} element={<SearchItems />} />
          <Route path={routes.editProfile} element={<EditProfile />} />
          <Route path="/shops/about/:id" element={<AboutShop />} />
          <Route path="/shops/edit/:id" element={<EditShop />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
