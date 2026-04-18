package com.hotelbooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotelbooking.model.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
    boolean existsByManager_UserId(Long managerId);
}