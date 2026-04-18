package com.hotelbooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotelbooking.model.Hotel;
import com.hotelbooking.model.User;
import com.hotelbooking.repository.HotelRepository;
import com.hotelbooking.repository.UserRepository;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private UserRepository userRepository;

    // ADD HOTEL (1 manager = 1 hotel)
    public Hotel addHotel(Hotel hotel, Long managerId) {

        if (hotel.getName() == null || hotel.getName().isEmpty())
            throw new RuntimeException("Hotel name required");

        if (hotel.getLocation() == null || hotel.getLocation().isEmpty())
            throw new RuntimeException("Location required");

        User manager = userRepository.findById(managerId)
                .orElseThrow(() -> new RuntimeException("Manager not found"));

        if (!manager.getRole().equalsIgnoreCase("MANAGER"))
            throw new RuntimeException("User is not a manager");

        if (hotelRepository.existsByManager_UserId(managerId))
            throw new RuntimeException("Manager already owns a hotel");

        hotel.setManager(manager);

        return hotelRepository.save(hotel);
    }

    // GET ALL HOTELS
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    // GET HOTEL BY ID
    public Hotel getHotelById(Long id) {
        return hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
    }
}