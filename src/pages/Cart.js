import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // 🗑 REMOVE ITEM
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // 🧾 PLACE ORDER
  const placeOrder = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      navigate("/");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: Date.now(),
      userEmail: user.email,
      items: cart, // IMPORTANT: matches AdminOrders + MyOrders
      status: "Placed",
    };

    orders.push(newOrder);

    localStorage.setItem("orders", JSON.stringify(orders));

    // clear cart after order
    localStorage.removeItem("cart");
    setCart([]);

    alert("Order placed successfully!");

    // redirect user to home or orders page
    navigate("/home");
  };

  return (
    <div style={styles.container}>
      <h1 style={{ textAlign: "center" }}>🛒 Shopping Cart</h1>

      {cart.length === 0 ? (
        <h3 style={{ textAlign: "center" }}>Your cart is empty</h3>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} style={styles.card}>
              <img src={item.image} style={styles.img} />

              <div style={{ flex: 1 }}>
                <h3>{item.title}</h3>
                <p>₹ {item.price}</p>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                style={styles.removeBtn}
              >
                Remove
              </button>
            </div>
          ))}

          <div style={{ textAlign: "center" }}>
            <button onClick={placeOrder} style={styles.orderBtn}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "20px",
    background: "#f4f6f8",
  },

  card: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "15px",
    margin: "10px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },

  img: {
    width: "100px",
    height: "100px",
    objectFit: "contain",
  },

  removeBtn: {
    background: "#e74c3c",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  orderBtn: {
    padding: "12px 25px",
    background: "#2ecc71",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default Cart;