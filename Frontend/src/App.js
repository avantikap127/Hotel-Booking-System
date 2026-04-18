import React, { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/CustomerDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";

function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  console.log("User:", user);

  // ✅ FIRST CHECK USER (VERY IMPORTANT)
  if (user && user.role && user.role.toUpperCase() === "CUSTOMER") {
    return React.createElement(CustomerDashboard, { user, setPage, setUser });
  }

  if (user && user.role && user.role.toUpperCase() === "MANAGER") {
    return React.createElement(ManagerDashboard, { user, setPage, setUser });
  }

  // THEN CHECK PAGE
  if (page === "login")
    return React.createElement(Login, { setPage, setUser });

  if (page === "register")
    return React.createElement(Register, { setPage });

  return React.createElement(Home, { setPage });
}

export default App;