import React, { useState } from "react";

function Register({ setPage }) {
  const [form, setForm] = useState({
    role: "CUSTOMER"   
  });

  const handleSubmit = () => {

    
    if (!form.name || !form.email || !form.password || !form.phone) {
      alert("All fields are required");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then(async res => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || "Registration failed");
        }
        return res.json();
      })
      .then(data => {
        console.log("Registered:", data);
        alert("Registration Successful");
        setPage("login");
      })
      .catch(err => {
        console.error(err);
        alert("Error: " + err.message);
      });
  };

  return React.createElement("div", { className: "container" },

    React.createElement("h2", null, "Register"),

    React.createElement("input", {
      placeholder: "Name",
      onChange: e => setForm({ ...form, name: e.target.value })
    }),

    React.createElement("input", {
      placeholder: "Email",
      onChange: e => setForm({ ...form, email: e.target.value })
    }),

    React.createElement("input", {
      placeholder: "Password",
      type: "password",
      onChange: e => setForm({ ...form, password: e.target.value })
    }),

    React.createElement("input", {
      placeholder: "Phone",
      onChange: e => setForm({ ...form, phone: e.target.value })
    }),

    React.createElement("select", {
      value: form.role,
      onChange: e => setForm({ ...form, role: e.target.value })
    },
      React.createElement("option", { value: "CUSTOMER" }, "CUSTOMER"),
      React.createElement("option", { value: "MANAGER" }, "MANAGER")
    ),

    React.createElement("br"),

    React.createElement("button", {
      onClick: handleSubmit,
      className: "primary"
    }, "Register")

  );
}

export default Register;