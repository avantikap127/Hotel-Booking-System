package com.hotelbooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotelbooking.model.Hotel;
import com.hotelbooking.model.Room;
import com.hotelbooking.repository.HotelRepository;
import com.hotelbooking.repository.RoomRepository;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private HotelRepository hotelRepository;

    // ADD ROOM
    public Room addRoom(Room room, Long hotelId) {

        if (room.getCategory() == null || room.getCategory().isEmpty())
            throw new RuntimeException("Room category required");

        if (room.getPrice() <= 0)
            throw new RuntimeException("Price must be greater than 0");

        if (room.getTotalRooms() <= 0)
            throw new RuntimeException("Total rooms must be > 0");

        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));

        room.setHotel(hotel);
        room.setAvailableRooms(room.getTotalRooms());

        return roomRepository.save(room);
    }

    // GET ROOMS BY HOTEL
    public List<Room> getRoomsByHotel(Long hotelId) {
        return roomRepository.findByHotel_HotelId(hotelId);
    }
}