import React from "react";
import { useCart } from "react-use-cart";

const Success = () => {
  const { emptyCart } = useCart;
  setTimeout(function redirectBack() {
    window.location.href = "http://localhost:3000";
    emptyCart();
  }, 5000);
  return (
    <div>
      <center>
        <h1>Success</h1>
        <h2>Thank you for you Purchase</h2>
      </center>
    </div>
  );
};

export default Success;
