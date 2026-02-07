package com.example.demo.controller;
 
import java.util.List;
import java.util.Optional;

import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.convert.Delimiter;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.service.annotation.PatchExchange;

import com.example.demo.entity.Task;
import com.example.demo.entity.User;
import com.example.demo.repository.TaskRepository;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/task")

public class TaskController {

    private final UserRepository userRepository;

	@Autowired
	private TaskRepository taskRepository;

    TaskController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
	
	@GetMapping("/allTask")
	public List<Task> getAllTasks() {
		return taskRepository.findAll();
			
	}
	@PostMapping("/addTask")
	public Task createTask(@RequestBody Task task) {
		return taskRepository.save(task);
		
	}
	
	@PutMapping("/{id}")
	public Task editTask(@PathVariable("id") int id, @RequestBody Task task)
	{
		Task task1 = taskRepository.findById(id).get();
		if(task1!=null)
		{
			task1.setStatus(task.getStatus());
			task1.setTitle(task.getTitle());
			return taskRepository.save(task1);
		}
		return null;
				
	}
	
	@DeleteMapping("/{id}")
	public void deleteTask(@PathVariable("id") int id) {
		taskRepository.deleteById(id);
		
	}
	
}
