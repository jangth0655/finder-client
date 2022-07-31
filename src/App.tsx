import React from "react";
import { useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { isLoggedInVar } from "./apollo";
import Home from "./screen/Home";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
