package com.hotelbooking.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hotelbooking.model.User;
import com.hotelbooking.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // REGISTER
    public User register(User user) {

        if (user.getName() == null || user.getName().isEmpty())
            throw new RuntimeException("Name is required");

        if (user.getEmail() == null || user.getEmail().isEmpty())
            throw new RuntimeException("Email is required");

        if (user.getPassword() == null || user.getPassword().length() < 6)
            throw new RuntimeException("Password must be at least 6 characters");

        if (userRepository.findByEmail(user.getEmail()).isPresent())
            throw new RuntimeException("Email already exists");

    if (user.getRole() == null) {
    throw new RuntimeException("Role is required");
}

if (!user.getRole().equalsIgnoreCase("CUSTOMER") &&
    !user.getRole().equalsIgnoreCase("MANAGER")) {
    throw new RuntimeException("Invalid role");
}

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    // LOGIN
    public User login(String email, String password) {

        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty())
            throw new RuntimeException("User not found");

        User user = optionalUser.get();
        if (user.getPassword() == null) {
            throw new RuntimeException("Password not found");
        }

        boolean isMatch = passwordEncoder.matches(password, user.getPassword());

        if (!isMatch) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }
}