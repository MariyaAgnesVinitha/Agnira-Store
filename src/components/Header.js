
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    updateCart();

    window.addEventListener("storage", updateCart);

    return () => {
      window.removeEventListener("storage", updateCart);
    };
  }, []);

  return (
    <header className="header">
      <h2>Agnira Store</h2>

      <nav>
  <Link to="/">Home</Link>
  <Link to="/products">Products</Link>
  <Link to="/cart">Cart</Link>
</nav>
    </header>
  );
}

export default Header;