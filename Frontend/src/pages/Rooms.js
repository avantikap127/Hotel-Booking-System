import React, { useEffect, useState } from "react";

function Rooms({ hotel, setSelectedRoom }) {

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/rooms/${hotel.hotelId}`)
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(() => alert("Error loading rooms"));
  }, [hotel]);

  return React.createElement("div", null,

    React.createElement("div", { className: "container" },

      React.createElement("h2", null, hotel.name),

      rooms.map(r =>
        React.createElement("div", {
          className: "card",
          key: r.roomId
        },

          React.createElement("img", {
            src: r.imageUrl,
            alt: "room"
          }),

          React.createElement("h3", null, r.category),

          React.createElement("p", null, "Price: ₹" + r.price),

          React.createElement("p", null, "Available: " + r.availableRooms),

          React.createElement(
            "p",
            null,
            "Amenities: Toiletries, Wi-Fi, Coffee Makers, Locker"
          ),

          React.createElement("button", {
            onClick: () => setSelectedRoom(r)
          }, "Proceed to Book")

        )
      )

    )
  );
}

export default Rooms;