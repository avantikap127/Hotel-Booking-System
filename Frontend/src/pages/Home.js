import React from "react";

function Home({ setPage }) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      { className: "navbar" },
      React.createElement("h2", null, "Hotel Booking"),
      React.createElement("div", null,
        React.createElement("button", { onClick: () => setPage("login") }, "Login"),
        React.createElement("button", { onClick: () => setPage("register") }, "Register")
      )
    ),
    React.createElement(
      "div",
      { className: "container" },
      React.createElement("h1", null, "Welcome to Hotel Booking System")
    )
  );
}

export default Home;