import React from "react";
import { useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { isLoggedInVar } from "./apollo";
import Home from "./screen/Home";
import SignUp from "./screen/SignUp";
import Login from "./screen/Login";
import routes from "./screen/routes";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <Router>
      <Routes>
        {!isLoggedIn ? <Route path={routes.home} element={<SignUp />} /> : null}
        <Route path={routes.home} element={isLoggedIn ? <Home /> : <Login />} />
        <Route path={routes.login} element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
