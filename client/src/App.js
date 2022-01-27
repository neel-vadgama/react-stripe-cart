import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Products from "./components/Products";
import { Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";
import Cancel from "./components/Cancel";
import Success from "./components/Success";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Products />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/success" element={<Success />}></Route>
        <Route path="/cancel" element={<Cancel />}></Route>
      </Routes>
    </Router>
  );
};
export default App;
