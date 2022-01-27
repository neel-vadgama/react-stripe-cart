import React from "react";
import { useCart } from "react-use-cart";
import "../App.css";

const Navbar = () => {
  const { totalUniqueItems } = useCart();
  return (
    <div className="navbar">
      <p className="logo">Logo</p>
      <a href="/cart">
        cart <i className="bi bi-cart3"></i>
        <p className="cart-item-count">{totalUniqueItems}</p>
      </a>
    </div>
  );
};

export default Navbar;
