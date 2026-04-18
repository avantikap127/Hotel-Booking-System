import React, { useEffect, useState } from "react";
import Rooms from "./Rooms";
import Booking from "./Booking";

function CustomerDashboard({ user, setPage, setUser }) {   // ⭐ add setUser

  const [hotels, setHotels] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [location, setLocation] = useState("");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/hotel/all")
      .then(res => res.json())
      .then(data => {
        setHotels(data);
        setFiltered(data);
      })
      .catch(() => alert("Error loading hotels"));
  }, []);

  const search = () => {
    const result = hotels.filter(h =>
      h.location.toLowerCase().includes(location.toLowerCase())
    );
    setFiltered(result);
  };

  // 🔁 ROOM FLOW
  if (selectedRoom)
    return React.createElement(Booking, { room: selectedRoom, user });

  if (selectedHotel)
    return React.createElement(Rooms, { hotel: selectedHotel, setSelectedRoom });

  return React.createElement("div", null,

    // Navbar
    React.createElement("div", { className: "navbar" },
      React.createElement("h3", null, "Customer Dashboard"),
      React.createElement("div", null,

        // ✅ FIXED LOGOUT
        React.createElement("button", {
          onClick: () => {
            setUser(null);      // ⭐ MOST IMPORTANT
            setPage("home");
          }
        }, "Logout")

      )
    ),

    // Search
    React.createElement("div", { className: "container" },
      React.createElement("input", {
        placeholder: "Search by location",
        onChange: e => setLocation(e.target.value)
      }),
      React.createElement("button", { onClick: search }, "Search")
    ),

    // Hotels
    filtered.map(h =>
      React.createElement("div", { className: "card", key: h.hotelId },
        React.createElement("img", { src: h.imageUrl, alt: "hotel" }),
        React.createElement("h3", null, h.name),
        React.createElement("p", null, h.location),
        React.createElement("button", {
          onClick: () => setSelectedHotel(h)
        }, "View Rooms")
      )
    )
  );
}

export default CustomerDashboard;