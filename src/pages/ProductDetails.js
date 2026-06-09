
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  // 🛒 ADD TO CART
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to Cart!");
    navigate("/cart");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{product.title}</h2>

      <img
        src={product.image}
        style={{
          width: "250px",
          height: "250px",
          objectFit: "contain",
        }}
      />

      <h3>₹ {product.price}</h3>
      <p>{product.description}</p>

      <p>
        <b>Category:</b> {product.category}
      </p>

      <button onClick={addToCart} style={styles.btn}>
        Add to Cart
      </button>

      <br /><br />

      <Link to="/products">
        <button>⬅ Back</button>
      </Link>
    </div>
  );
}

const styles = {
  btn: {
    padding: "10px 20px",
    background: "#3498db",
    color: "white",
    border: "none",
    marginTop: "10px",
  },
};

export default ProductDetails;