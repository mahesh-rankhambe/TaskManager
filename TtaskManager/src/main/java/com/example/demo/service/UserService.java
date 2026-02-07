package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;

@Service
public class  UserService {

    @Autowired
    private UserRepository userRepository;

   
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

  
    public User getUserById(int id) {
        return userRepository.findById(id).orElse(null);
    }

   
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }


	public User login(String email, String password) {
		// TODO Auto-generated method stub
		User user = userRepository.findByEmail(email);
		if(user.getPassword().equals(password))
		{
			return user;
		}
		return null;
		
	}
}
