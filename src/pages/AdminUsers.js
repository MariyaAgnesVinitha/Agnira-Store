import React, { useEffect, useState } from "react";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("users")) || []);
    setOrders(JSON.parse(localStorage.getItem("orders")) || []);
  }, []);

  // 📦 get orders for a user
  const getUserOrders = (email) => {
    return orders.filter((o) => o.userEmail === email);
  };

  return (
    <div style={styles.container}>
      <h2>👥 Users & Orders</h2>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((user, i) => (
          <div key={i} style={styles.card}>

            {/* USER INFO */}
            <h3>📧 {user.email}</h3>
            <p>🔐 Role: {user.role}</p>

            {/* USER ORDERS */}
            <h4>📦 Orders:</h4>

            {getUserOrders(user.email).length === 0 ? (
              <p>No orders placed</p>
            ) : (
              getUserOrders(user.email).map((order) => (
                <div key={order.id} style={styles.orderBox}>
                  <p><b>Status:</b> {order.status}</p>

                  {order.items.map((item, idx) => (
                    <div key={idx} style={styles.item}>
                      <img src={item.image} style={styles.img} />
                      <span>{item.title}</span>
                      <span>₹ {item.price}</span>
                    </div>
                  ))}
                </div>
              ))
            )}
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
  },

  orderBox: {
    marginTop: "10px",
    padding: "10px",
    background: "#f9f9f9",
    borderRadius: "8px",
  },

  item: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "5px",
  },

  img: {
    width: "40px",
    height: "40px",
    objectFit: "contain",
  },
};

export default AdminUsers;