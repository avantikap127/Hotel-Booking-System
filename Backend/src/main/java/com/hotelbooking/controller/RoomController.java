package com.hotelbooking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotelbooking.model.Room;
import com.hotelbooking.service.RoomService;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin
public class RoomController {

    @Autowired
    private RoomService roomService;

    // ADD ROOM
    @PostMapping("/{hotelId}")
    public Room addRoom(@RequestBody Room room,
                        @PathVariable Long hotelId) {
        return roomService.addRoom(room, hotelId);
    }

    // GET ROOMS BY HOTEL
    @GetMapping("/{hotelId}")
    public List<Room> getRooms(@PathVariable Long hotelId) {
        return roomService.getRoomsByHotel(hotelId);
    }
}