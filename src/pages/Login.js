import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    // 👤 ADMIN
    const admin = {
      email: "admin@gmail.com",
      password: "admin123",
      role: "admin",
    };

    // 👤 USER
    const user = {
      email: "user@gmail.com",
      password: "user123",
      role: "user",
    };

    let loggedInUser = null;

    if (email === admin.email && password === admin.password) {
      loggedInUser = admin;
    } else if (email === user.email && password === user.password) {
      loggedInUser = user;
    }

    if (!loggedInUser) {
      alert("Invalid email or password");
      return;
    }

    // 💾 CURRENT SESSION
    localStorage.setItem("user", JSON.stringify(loggedInUser));

    // 👥 REGISTERED USERS LIST (FIXED & CLEAN)
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingIndex = users.findIndex(
      (u) => u.email === loggedInUser.email
    );

    if (existingIndex === -1) {
      users.push(loggedInUser);
    } else {
      users[existingIndex] = loggedInUser;
    }

    localStorage.setItem("users", JSON.stringify(users));

    alert(`${loggedInUser.role.toUpperCase()} login successful`);

    // 🚀 REDIRECT BASED ON ROLE
    setTimeout(() => {
      if (loggedInUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    }, 100);
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
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
    background: "linear-gradient(to right, #74ebd5, #ACB6E5)",
  },

  card: {
    padding: "30px",
    background: "white",
    borderRadius: "12px",
    width: "320px",
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
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  hint: {
    marginTop: "10px",
    fontSize: "12px",
    color: "#666",
  },
};

export default Login;