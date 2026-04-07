package com.api.kilow.controller;

import com.api.kilow.dto.LoginRequestDTO;
import com.api.kilow.dto.LoginResponseDTO;
import com.api.kilow.dto.UserCreateDTO;
import com.api.kilow.dto.UserCreateResponseDTO;
import com.api.kilow.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserCreateResponseDTO> createUser(@RequestBody UserCreateDTO dtoRequest){
        UserCreateResponseDTO savedUser = userService.createUser(dtoRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @GetMapping("/geAll")
    public ResponseEntity<List<UserCreateResponseDTO>> getAllUsers(){
        List<UserCreateResponseDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO dtoRequest){
        return userService.login(dtoRequest);
    }
}
