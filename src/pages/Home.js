import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImage, setNewImage] = useState("");

  // 👤 CURRENT USER
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  // 🛒 ADD TO CART (USER ONLY FEATURE)
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to Cart!");
  };

  // 📦 LOAD PRODUCTS
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products"));

    if (savedProducts && savedProducts.length > 0) {
      setProducts(savedProducts);
    } else {
      axios
        .get("https://fakestoreapi.com/products")
        .then((res) => {
          setProducts(res.data);
          localStorage.setItem("products", JSON.stringify(res.data));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  // 🔴 ADMIN - ADD PRODUCT
  const addProduct = () => {
    if (!newTitle || !newPrice || !newImage) {
      alert("Please fill all fields");
      return;
    }

    const product = {
      id: Date.now(),
      title: newTitle,
      price: newPrice,
      image: newImage,
    };

    const updated = [product, ...products];

    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));

    setNewTitle("");
    setNewPrice("");
    setNewImage("");

    alert("Product Added Successfully!");
  };

  // 🔴 ADMIN - DELETE PRODUCT
  const handleDelete = (id) => {
    const updated = products.filter((item) => item.id !== id);
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  // 🔴 ADMIN - EDIT PRODUCT
  const handleEdit = (id) => {
    const product = products.find((item) => item.id === id);

    const updatedTitle = prompt("Enter Product Name", product.title);
    const updatedPrice = prompt("Enter Product Price", product.price);
    const updatedImage = prompt("Enter Image URL", product.image);

    if (updatedTitle && updatedPrice && updatedImage) {
      const updated = products.map((item) =>
        item.id === id
          ? {
              ...item,
              title: updatedTitle,
              price: updatedPrice,
              image: updatedImage,
            }
          : item
      );

      setProducts(updated);
      localStorage.setItem("products", JSON.stringify(updated));
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: "30px" }}>

      {/* HERO SECTION */}
      <div className="hero-section">
        <h1 className="hero-title">✨ Agnira Store ✨</h1>
        <p style={{ color: "#666" }}>
          Discover elegant products from around the world
        </p>
      </div>

      {/* 🔴 ADMIN ADD PRODUCT PANEL */}
      {isAdmin && (
        <div style={styles.adminBox}>
          <input
            placeholder="Product Name"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={styles.input}
          />

          <input
            placeholder="Price"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            style={styles.input}
          />

          <input
            placeholder="Image URL"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            style={styles.input}
          />

          <button onClick={addProduct} style={styles.addBtn}>
            Add Product
          </button>
        </div>
      )}

      {/* SEARCH BAR */}
      <div style={{ textAlign: "center", margin: "20px" }}>
        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />
      </div>

      {/* PRODUCTS GRID */}
      <div className="products-container">
        {products
          .filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((item) => (
            <div className="product-card" key={item.id}>
              <img src={item.image} alt={item.title} />

              <h4>{item.title}</h4>

              <p style={{ color: "green", fontWeight: "bold" }}>
                ₹ {item.price}
              </p>

              {/* USER ACTIONS */}
              <Link to={`/product/${item.id}`}>
                <button>View</button>
              </Link>

              <button onClick={() => addToCart(item)}>
                Add To Cart
              </button>

              {/* ADMIN ACTIONS ONLY */}
              {isAdmin && (
                <>
                  <button onClick={() => handleEdit(item.id)}>
                    Edit
                  </button>

                  <button onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

const styles = {
  adminBox: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "20px",
  },

  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },

  addBtn: {
    padding: "10px 20px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  search: {
    width: "300px",
    padding: "10px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    outline: "none",
  },
};

export default Home;