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

import com.hotelbooking.model.Hotel;
import com.hotelbooking.service.HotelService;

@RestController
@RequestMapping("/api/hotel")
@CrossOrigin
public class HotelController {

    @Autowired
    private HotelService hotelService;

    // ADD HOTEL (Manager only)
    @PostMapping("/{managerId}")
    public Hotel addHotel(@RequestBody Hotel hotel,
                          @PathVariable Long managerId) {
        return hotelService.addHotel(hotel, managerId);
    }

    // GET ALL HOTELS
    @GetMapping("/all")
    public List<Hotel> getAllHotels() {
        return hotelService.getAllHotels();
    }

    // GET HOTEL BY ID
    @GetMapping("/{id}")
    public Hotel getHotelById(@PathVariable Long id) {
        return hotelService.getHotelById(id);
    }
}