package com.hotelbooking.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotelbooking.model.Booking;
import com.hotelbooking.model.Room;
import com.hotelbooking.model.User;
import com.hotelbooking.repository.BookingRepository;
import com.hotelbooking.repository.RoomRepository;
import com.hotelbooking.repository.UserRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    // BOOK ROOM
    public Booking bookRoom(Long userId, Long roomId, LocalDate checkIn, LocalDate checkOut) {

        if (checkIn == null || checkOut == null)
            throw new RuntimeException("Dates required");

        if (checkOut.isBefore(checkIn))
            throw new RuntimeException("Invalid dates");

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (room.getAvailableRooms() <= 0)
            throw new RuntimeException("No rooms available");

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setRoom(room);
        booking.setCheckInDate(checkIn);
        booking.setCheckOutDate(checkOut);
        booking.setStatus("PENDING");

        room.setAvailableRooms(room.getAvailableRooms() - 1);
        roomRepository.save(room);

        return bookingRepository.save(booking);
    }

    // USER BOOKINGS
    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUser_UserId(userId);
    }

    // APPROVE BOOKING
    public Booking approveBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus("ACCEPTED");
        return bookingRepository.save(booking);
    }

    // REJECT BOOKING
    public Booking rejectBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus("REJECTED");

        // return room count back
        Room room = booking.getRoom();
        room.setAvailableRooms(room.getAvailableRooms() + 1);
        roomRepository.save(room);

        return bookingRepository.save(booking);
    }
}