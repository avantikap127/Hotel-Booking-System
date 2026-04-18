import React, { useState } from "react";

function Login({ setPage, setUser }) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleLogin = () => {

    // 🔴 Basic validation
    if (!form.email || !form.password) {
      alert("Please enter email and password");
      return;
    }

    fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Login failed");
        }
        return res.json();
      })
      .then(data => {
        console.log("LOGIN RESPONSE:", data);

        if (!data || !data.role) {
          alert("Invalid response from server");
          return;
        }

        // ✅ Normalize role (IMPORTANT FIX)
        data.role = data.role.toUpperCase();

        alert("Login Successful");

        setUser(data);   // 🔥 this triggers dashboard in App.js
      })
      .catch(err => {
        console.error("LOGIN ERROR:", err);
        alert("Login failed: " + err.message);
      });
  };

  return React.createElement("div", { className: "container" },

    React.createElement("h2", null, "Login"),

    React.createElement("input", {
      placeholder: "Email",
      value: form.email,
      onChange: e => setForm({ ...form, email: e.target.value })
    }),

    React.createElement("input", {
      placeholder: "Password",
      type: "password",   // 🔥 FIXED (important)
      value: form.password,
      onChange: e => setForm({ ...form, password: e.target.value })
    }),

    React.createElement("br"),

    React.createElement("button", {
      onClick: handleLogin,
      className: "primary"
    }, "Login")

  );
}

export default Login;