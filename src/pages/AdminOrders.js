import React, { useEffect, useState } from "react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(stored);
  }, []);

  // 🔄 UPDATE STATUS
  const updateStatus = (id, newStatus) => {
    const updated = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );

    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  return (
    <div style={styles.container}>
      <h2>📦 Admin Order Dashboard</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={styles.card}>
            <div style={{ flex: 1 }}>
              <h3>Order ID: {order.id}</h3>

              <p>👤 User: {order.userEmail}</p>
              <p>📦 Status: <b>{order.status}</b></p>

              {/* ITEMS INSIDE ORDER */}
              {order.items.map((item, i) => (
                <div key={i} style={styles.itemBox}>
                  <img src={item.image} style={styles.img} />

                  <div>
                    <p>{item.title}</p>
                    <p>₹ {item.price}</p>
                  </div>
                </div>
              ))}

              {/* STATUS BUTTONS */}
              <div style={styles.btnRow}>
                <button
                  onClick={() => updateStatus(order.id, "Placed")}
                  style={styles.btn}
                >
                  Placed
                </button>

                <button
                  onClick={() => updateStatus(order.id, "Shipped")}
                  style={styles.btn2}
                >
                  Shipped
                </button>

                <button
                  onClick={() => updateStatus(order.id, "Delivered")}
                  style={styles.btn3}
                >
                  Delivered
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "#f4f6f8",
    minHeight: "100vh",
  },

  card: {
    background: "white",
    padding: "15px",
    margin: "10px 0",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  itemBox: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginTop: "10px",
  },

  img: {
    width: "60px",
    height: "60px",
    objectFit: "contain",
  },

  btnRow: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  btn: {
    padding: "5px 10px",
    background: "#f39c12",
    color: "white",
    border: "none",
  },

  btn2: {
    padding: "5px 10px",
    background: "#3498db",
    color: "white",
    border: "none",
  },

  btn3: {
    padding: "5px 10px",
    background: "#2ecc71",
    color: "white",
    border: "none",
  },
};

export default AdminOrders;