package com.api.kilow.controller;

import com.api.kilow.dto.user.LoginRequest;
import com.api.kilow.dto.user.LoginResponse;
import com.api.kilow.dto.user.UserCreate;
import com.api.kilow.dto.user.UserCreateResponse;
import com.api.kilow.service.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
public class UserController {

  @Autowired private UserService userService;

  @PostMapping("/register")
  public ResponseEntity<UserCreateResponse> createUser(@RequestBody UserCreate dtoRequest) {
    UserCreateResponse savedUser = userService.createUser(dtoRequest);
    return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
  }

  @GetMapping("/geAll")
  public ResponseEntity<List<UserCreateResponse>> getAllUsers() {
    List<UserCreateResponse> users = userService.getAllUsers();
    return ResponseEntity.ok(users);
  }

  @PostMapping("/login")
  public LoginResponse login(@RequestBody LoginRequest dtoRequest) {
    return userService.login(dtoRequest);
  }
}
