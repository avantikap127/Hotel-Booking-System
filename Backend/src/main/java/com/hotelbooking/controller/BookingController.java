package com.hotelbooking.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hotelbooking.model.Booking;
import com.hotelbooking.service.BookingService;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // BOOK ROOM
    @PostMapping("/book")
    public Booking bookRoom(@RequestParam Long userId,
                            @RequestParam Long roomId,
                            @RequestParam String checkIn,
                            @RequestParam String checkOut) {

        LocalDate checkInDate = LocalDate.parse(checkIn);
        LocalDate checkOutDate = LocalDate.parse(checkOut);

        return bookingService.bookRoom(userId, roomId, checkInDate, checkOutDate);
    }

    // GET USER BOOKINGS
    @GetMapping("/user/{userId}")
    public List<Booking> getUserBookings(@PathVariable Long userId) {
        return bookingService.getUserBookings(userId);
    }

    // APPROVE BOOKING (Manager)
    @PutMapping("/approve/{bookingId}")
    public Booking approve(@PathVariable Long bookingId) {
        return bookingService.approveBooking(bookingId);
    }

    // REJECT BOOKING (Manager)
    @PutMapping("/reject/{bookingId}")
    public Booking reject(@PathVariable Long bookingId) {
        return bookingService.rejectBooking(bookingId);
    }
}