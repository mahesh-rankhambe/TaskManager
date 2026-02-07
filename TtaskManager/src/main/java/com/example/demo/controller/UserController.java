package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UserController {

    private final UserRepository userRepository;

    @Autowired
    private UserService userService;

    UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ✅ Add User (Register)
    @PostMapping("/save")
    public User saveUser(@RequestBody User user) {
        return userService.saveUser(user);
    }
    
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestParam("email") String email,@RequestParam("password") String password)
    {
    	User user = userService.login(email,password);
    	return new ResponseEntity<>(user,HttpStatus.ACCEPTED);
    }
    // ✅ Get All Users
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // ✅ Get User By ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable int id) {
        return userService.getUserById(id);
    }

    // ✅ Delete User
    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return "User deleted successfully!";
    }
}
