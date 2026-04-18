import React, { useState } from "react";

function Booking({ room, user }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const book = () => {
    fetch(`http://localhost:8080/api/bookings/book?userId=${user.userId}&roomId=${room.roomId}&checkIn=${checkIn}&checkOut=${checkOut}`, {
      method: "POST"
    })
      .then(res => res.json())
      .then(() => alert("Booking Successful"))
      .catch(() => alert("Booking failed"));
  };

  return React.createElement("div", { className: "container" },
    React.createElement("h2", null, "Book Room"),
    React.createElement("p", null, room.category),
    React.createElement("input", { type: "date", onChange: e => setCheckIn(e.target.value) }),
    React.createElement("input", { type: "date", onChange: e => setCheckOut(e.target.value) }),
    React.createElement("button", { onClick: book }, "Book Now")
  );
}

export default Booking;