import React, { useState } from "react";

function ManagerDashboard({ user, setPage, setUser }) {

  const [hotel, setHotel] = useState({});
  const [room, setRoom] = useState({});
  const [hotelId, setHotelId] = useState(null);

  const addHotel = () => {
    fetch(`http://localhost:8080/api/hotel/${user.userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(hotel)
    })
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to add hotel");
        }
        return res.json();
      })
      .then(data => {
        setHotelId(data.hotelId);
        alert("Hotel Added Successfully");
      })
      .catch(err => {
        alert("Error: " + err.message);
      });
  };

  const addRoom = () => {

    if (!hotelId) {
      alert("Please add hotel first");
      return;
    }

    fetch(`http://localhost:8080/api/rooms/${hotelId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(room)
    })
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to add room");
        }
        return res.json();
      })
      .then(() => {
        alert("Room Added Successfully");
      })
      .catch(err => {
        alert("Error: " + err.message);
      });
  };

  return React.createElement("div", null,

    // Navbar
    React.createElement("div", { className: "navbar" },

      React.createElement("h3", null, "Manager Dashboard"),

      React.createElement("button", {
        onClick: () => {
          setUser(null);     // ⭐ IMPORTANT FIX
          setPage("home");
        }
      }, "Logout")

    ),

    React.createElement("div", { className: "container" },

      // Add Hotel
      React.createElement("h3", null, "Add Hotel"),

      React.createElement("input", {
        placeholder: "Hotel Name",
        onChange: e => setHotel({ ...hotel, name: e.target.value })
      }),

      React.createElement("input", {
        placeholder: "Location",
        onChange: e => setHotel({ ...hotel, location: e.target.value })
      }),

      React.createElement("input", {
        placeholder: "Description",
        onChange: e => setHotel({ ...hotel, description: e.target.value })
      }),

      React.createElement("input", {
        placeholder: "Hotel Image URL",
        onChange: e => setHotel({ ...hotel, imageUrl: e.target.value })
      }),

      React.createElement("br"),

      React.createElement("button", {
        onClick: addHotel
      }, "Add Hotel"),

      // Add Room
      React.createElement("h3", null, "Add Room"),

      React.createElement("input", {
        placeholder: "Category",
        onChange: e => setRoom({ ...room, category: e.target.value })
      }),

      React.createElement("input", {
        placeholder: "Price",
        onChange: e => setRoom({ ...room, price: e.target.value })
      }),

      React.createElement("input", {
        placeholder: "Total Rooms",
        onChange: e => setRoom({ ...room, totalRooms: e.target.value })
      }),

      React.createElement("input", {
        placeholder: "Amenities",
        onChange: e => setRoom({ ...room, amenities: e.target.value })
      }),

      React.createElement("input", {
        placeholder: "Room Image URL",
        onChange: e => setRoom({ ...room, imageUrl: e.target.value })
      }),

      React.createElement("br"),

      React.createElement("button", {
        onClick: addRoom
      }, "Add Room")

    )
  );
}

export default ManagerDashboard;