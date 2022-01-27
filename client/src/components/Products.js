import React, { useEffect, useState } from "react";
import "../App.css";
import Navbar from "./Navbar";
import ProductItem from "./ProductItem";

const Products = () => {
  const [data, setData] = useState([{}]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products/");
      const products = await res.json();
      setData(products);
    } catch (err) {
      console.log("error", err.message);
      return;
    }

    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <center>
        <h2>Products is Loading...</h2>
      </center>
    );
  } else {
    return (
      <section>
        <Navbar />
        <h4>
          <center>Product List</center>
        </h4>
        <div className="product-list">
          {data.map((product) => (
            <ProductItem key={parseInt(product.id)} product={product} />
          ))}
        </div>
      </section>
    );
  }
};
export default Products;
