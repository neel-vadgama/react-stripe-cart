import React, { useState } from "react";
import { useCart } from "react-use-cart";
import { loadStripe } from "@stripe/stripe-js";

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe("pk_test_add_your_stripe_public_key");
  }
  return stripePromise;
};

const Cart = () => {
  const {
    isEmpty,
    totalUniqueItems,
    updateItemQuantity,
    cartTotal,
    items,
    removeItem,
  } = useCart();

  let totalItems = items
    .map((item) => item.quantity)
    .reduce((prev, next) => prev + next);

  const data = {
    total: cartTotal,
    quantity: totalItems,
  };

  const [isLoading, setLoading] = useState(false);

  const redirectToCheckout = async () => {
    setLoading(true);
    console.log("redirectToCheckout");
    console.log("data: ", items);
    const stripe = await getStripe();
    const response = await fetch(
      "http://localhost:4242/create-checkout-session",
      {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      }
    );
    const session = await response.json();
    console.log(session);

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log("Stripe checkout error", result.error);
    }
    setLoading(false);
  };

  if (isEmpty) {
    return (
      <h1>
        <center>Your cart is empty</center>
      </h1>
    );
  } else {
    return (
      <>
        <h1 className="cart-header">Cart ({totalUniqueItems})</h1>
        <div className="cart-outer">
          <ul>
            {items.map((item) => (
              <div key={item.id} className="cart">
                <div>
                  <p>Title: {item.title}</p>
                  <p>Price: {item.price}</p>
                  <p>category: {item.category}</p>
                </div>
                <div>
                  <img
                    src={item.image}
                    width="150px"
                    height="100px"
                    alt="product_image"
                  />
                </div>
                <div className="cart-actions">
                  <li key={item.id}>
                    {item.quantity} x{" "}
                    <button
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity - 1)
                      }
                    >
                      <h2>&minus;</h2>
                    </button>
                    <button
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <h2>&#43;</h2>
                    </button>
                    <button onClick={() => removeItem(item.id)}>
                      <h2>&times;</h2>
                    </button>
                  </li>
                </div>
              </div>
            ))}
          </ul>
          <div className="checkout">
            <h5>Payment and Total</h5>
            <ul>
              {items.map((item) => (
                <li key={item.id} className="payment-item">
                  <div>
                    <p>{item.title}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <p className="item-price">
                    &#36;{item.price * item.quantity}
                  </p>
                </li>
              ))}
            </ul>
            <h4 className="total-payment">
              <span>Total: </span>
              <span>&#36; {cartTotal}</span>
            </h4>
            <button onClick={redirectToCheckout} disabled={isLoading}>
              {isLoading ? "Loading..." : "Checkout"}
            </button>
          </div>
        </div>
      </>
    );
  }
};

export default Cart;
