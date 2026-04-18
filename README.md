# 🏨 Hotel Booking System

A full-stack **Hotel Booking System** built using **React.js, Spring Boot, and MySQL** with a clean and modern UI. The system supports **role-based access** for **Customers** and **Managers**, allowing hotel listing, room booking, hotel/room management, and authentication.

---

## 🚀 Features

### 👤 Customer Features

* User Registration & Login
* View all hotels on homepage
* View hotel manager name and phone number
* Browse available rooms for each hotel
* Book rooms with check-in and check-out dates
* Booking access only after login
* Only customers can book rooms
* Logout functionality

### 👨‍💼 Manager Features

* Manager Registration & Login
* Secure manager dashboard
* Add hotel details with image URL
* Add room details with image URL
* Automatic hotel mapping (1 Manager = 1 Hotel)
* Delete hotel functionality
* Hotels shown in dashboard with centered delete section
* Logout functionality

### 🔐 Authentication & Authorization

* Role-based UI rendering
* Protected booking page
* Protected manager dashboard
* Session handling using `localStorage`
* Manager cannot book rooms
* Customer cannot access dashboard

---


## 🛠️ Tech Stack

### Frontend

* React.js

### Backend

* Spring Boot

### Database

* MySQL

---

## 📂 Project Structure

### Frontend

```bash
src/
 ├── components/
 │    └── Navbar.js
 │
 ├── pages/
 │    ├── Home.js
 │    ├── Rooms.js
 │    ├── Booking.js
 │    ├── Login.js
 │    ├── Register.js
 │    └── CustomerDashboard.js
 │
 ├── styles/
 │    └── style.css

```

### Backend

```bash
src/main/java/com/hotelbooking/
 ├── controller/
 ├── service/
 ├── repository/
 ├── entity/
 └── HotelBookingApplication.java
```

---

## ⚙️ Installation & Setup

### 🔹 Backend Setup

```bash
cd Backend
mvn clean install
mvn spring-boot:run
```

Backend runs on:

```bash
http://localhost:8080
```

### 🔹 Frontend Setup

```bash
cd Frontend
npm install
npm start
```

Frontend runs on:

```bash
http://localhost:3000
```

---

## 🗄️ Database Schema

### Tables

* `users`
* `hotels`
* `rooms`
* `bookings`

### Main Relationships

* One **Manager** manages one **Hotel**
* One **Hotel** has multiple **Rooms**
* One **Customer** can make multiple **Bookings**

---

## 🎯 Workflow

### Customer Flow

Register → Login → View Hotels → View Rooms → Book Room → Logout

### Manager Flow

Register → Login → Dashboard → Add Hotel → Add Rooms → Delete Hotel → Logout

---

## ✨ UI Highlights

* Clean card-based design
* Smooth hover effects
* Responsive login/register forms
* Centered authentication pages
* Modern manager dashboard layout
* Beautiful CSS animations
* Professional navbar with conditional links

---

## 🧠 Key Learning Outcomes

* Role-based authentication
* REST API integration
* React state management
* Route protection
* CRUD operations
* Clean layered architecture
* Responsive UI design

---

## 📸 Future Enhancements

* JWT Authentication
* Booking history page
* Edit hotel/room
* Delete room
* Hotel ratings & reviews
* Payment integration
* Cloud image upload

---
