import React, { useEffect, useState } from "react";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const allOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    // show only current user's orders
    const userOrders = allOrders.filter(
      (order) => order.userEmail === user?.email
    );

    setOrders(userOrders);
  }, [user]);

  return (
    <div style={styles.container}>
      <h2>🧾 My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders placed yet</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} style={styles.card}>
            <h3>Order #{index + 1}</h3>

            {order.items.map((item, i) => (
              <div key={i} style={styles.item}>
                <img src={item.image} alt="" style={styles.img} />
                <div>
                  <p>{item.title}</p>
                  <p>₹ {item.price}</p>
                </div>
              </div>
            ))}

            <p>
              <b>Status:</b> {order.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    minHeight: "100vh",
    background: "#f4f6f8",
  },

  card: {
    background: "white",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  item: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginBottom: "10px",
  },

  img: {
    width: "60px",
    height: "60px",
    objectFit: "contain",
  },
};

export default MyOrders;