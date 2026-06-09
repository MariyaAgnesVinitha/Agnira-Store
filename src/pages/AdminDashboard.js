import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔐 protect admin route (FIXED dependency issue)
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.banner}>
        <h2 style={styles.title}>Admin Dashboard</h2>

        <div style={styles.right}>
          <span>{user?.email}</span>

          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* CARDS */}
      <div style={styles.grid}>
        {/* PRODUCTS */}
        <div style={styles.card}>
          <h3>📦 Products</h3>
          <p>Add / Edit / Delete Products</p>

          <button
            style={styles.btn}
            onClick={() => navigate("/admin/products")}
          >
            Manage Products
          </button>
        </div>

        {/* USERS */}
        <div style={styles.card}>
          <h3>👤 Users</h3>
          <p>View registered users + orders</p>

          <button
            style={styles.btn}
            onClick={() => navigate("/admin/users")}
          >
            View Users
          </button>
        </div>

        {/* ORDERS */}
        <div style={styles.card}>
          <h3>📊 Orders</h3>
          <p>Track customer orders</p>

          <button
            style={styles.btn}
            onClick={() => navigate("/admin/orders")}
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
    fontFamily: "Arial",
  },

  banner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2c3e50",
    color: "white",
    padding: "15px 20px",
    borderRadius: "8px",
    marginBottom: "25px",
  },

  title: {
    margin: 0,
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  logoutBtn: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  btn: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default AdminDashboard;

