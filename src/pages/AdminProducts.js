import React, { useEffect, useState } from "react";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const [editId, setEditId] = useState(null);

  // 🔥 LOAD PRODUCTS (with fallback data)
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("products"));

    if (!data || data.length === 0) {
      data = [
        {
          id: 1,
          title: "Nike Shoes",
          price: 2999,
          image:
            "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
        },
        {
          id: 2,
          title: "Smart Watch",
          price: 1999,
          image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        },
      ];

      localStorage.setItem("products", JSON.stringify(data));
    }

    setProducts(data);
  }, []);

  // 💾 SAVE
  const save = (data) => {
    setProducts(data);
    localStorage.setItem("products", JSON.stringify(data));
  };

  // ➕ ADD PRODUCT
  const addProduct = () => {
    if (!title || !price || !image) {
      alert("Please fill all fields");
      return;
    }

    const newProduct = {
      id: Date.now(),
      title,
      price,
      image,
    };

    save([newProduct, ...products]);

    setTitle("");
    setPrice("");
    setImage("");
  };

  // 🗑 DELETE
  const deleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    save(updated);
  };

  // ✏️ EDIT
  const editProduct = (p) => {
    setTitle(p.title);
    setPrice(p.price);
    setImage(p.image);
    setEditId(p.id);
  };

  // 🔄 UPDATE
  const updateProduct = () => {
    const updated = products.map((p) =>
      p.id === editId
        ? { ...p, title, price, image }
        : p
    );

    save(updated);

    setTitle("");
    setPrice("");
    setImage("");
    setEditId(null);
  };

  return (
    <div style={styles.container}>
      <h2>📦 Admin Product Panel</h2>

      {/* FORM */}
      <div style={styles.form}>
        <input
          placeholder="Product Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        {editId ? (
          <button style={styles.updateBtn} onClick={updateProduct}>
            Update Product
          </button>
        ) : (
          <button style={styles.addBtn} onClick={addProduct}>
            Add Product
          </button>
        )}
      </div>

      {/* PRODUCT GRID */}
      <div style={styles.grid}>
        {products.map((p) => (
          <div key={p.id} style={styles.card}>
            <img
              src={p.image}
              alt={p.title}
              style={styles.img}
            />

            <h4>{p.title}</h4>
            <p>₹ {p.price}</p>

            <div style={styles.btnRow}>
              <button
                style={styles.edit}
                onClick={() => editProduct(p)}
              >
                Edit
              </button>

              <button
                style={styles.delete}
                onClick={() => deleteProduct(p.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "#f4f6f8",
    minHeight: "100vh",
  },

  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  img: {
    width: "120px",
    height: "120px",
    objectFit: "contain",
  },

  btnRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },

  addBtn: {
    background: "#27ae60",
    color: "white",
    border: "none",
    padding: "8px",
    cursor: "pointer",
  },

  updateBtn: {
    background: "#f39c12",
    color: "white",
    border: "none",
    padding: "8px",
    cursor: "pointer",
  },

  edit: {
    background: "#3498db",
    color: "white",
    border: "none",
    padding: "5px",
  },

  delete: {
    background: "#e74c3c",
    color: "white",
    border: "none",
    padding: "5px",
  },
};

export default AdminProducts;