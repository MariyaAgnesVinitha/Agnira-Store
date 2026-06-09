import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();

    if (!name || !price || !image) {
      alert("Fill all fields");
      return;
    }

    // Get existing products
    const existingProducts =
      JSON.parse(localStorage.getItem("products")) || [];

    // New product object
    const newProduct = {
      id: Date.now(),
      name,
      price,
      image,
    };

    // Save updated list
    localStorage.setItem(
      "products",
      JSON.stringify([...existingProducts, newProduct])
    );

    alert("Product added successfully!");

    // clear fields
    setName("");
    setPrice("");
    setImage("");

    navigate("/admin");
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleAdd}>
        <h2>Add Product</h2>

        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Add Product
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#ecf0f1",
  },
  card: {
    padding: "20px",
    background: "white",
    borderRadius: "10px",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    borderRadius: "6px",
  },
};

export default AddProduct;