import React from "react";
import { useCart } from "react-use-cart";
import "../App.css";

const ProductItem = ({ product }) => {
  const { addItem } = useCart();
  return (
    <div key={product.id} className="product">
      <p>ID: {product.id}</p>
      <p>Title: {product.title}</p>
      <p>Price: {product.price}</p>
      <p>category: {product.category}</p>
      <img
        src={product.image}
        width="150px"
        height="100px"
        alt="product_image"
      />
      <p>
        <button key={parseInt(product.id)} onClick={() => addItem(product)}>
          Add to cart
        </button>
      </p>
    </div>
  );
};

export default ProductItem;
