package com.api.kilow.service;

import com.api.kilow.dto.user.LoginRequest;
import com.api.kilow.dto.user.LoginResponse;
import com.api.kilow.dto.user.UserCreate;
import com.api.kilow.dto.user.UserCreateResponse;
import com.api.kilow.exception.RulesException;
import com.api.kilow.mapper.UserMapper;
import com.api.kilow.model.User;
import com.api.kilow.repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired private UserRepository userRepository;

  @Autowired private UserMapper userMapper;

  @Autowired private PasswordEncoder passwordEncoder;

  @Autowired private TokenService tokenService;

  public UserCreateResponse createUser(UserCreate requestDTO) {
    User newUserModel = userMapper.dtoToModel(requestDTO);

    newUserModel.setSenha(passwordEncoder.encode(newUserModel.getSenha()));

    User savedUser = userRepository.save(newUserModel);

    return userMapper.modelToDto(savedUser);
  }

  public List<UserCreateResponse> getAllUsers() {
    return userRepository.findAll().stream().map(userMapper::modelToDto).toList();
  }

  public LoginResponse login(LoginRequest requestDTO) {
    var user =
        userRepository
            .findByEmail(requestDTO.email())
            .orElseThrow(() -> new RulesException("Usuário não encontrado"));

    if (passwordEncoder.matches(requestDTO.senha(), user.getSenha())) {
      String token = tokenService.generateToken(user);

      return userMapper.modelToResponseLoginDto(user, token);
    } else {
      throw new RulesException("Senha inválida");
    }
  }

  public User getUserById(Long userId) {
    return userRepository
        .findById(userId)
        .orElseThrow(() -> new RulesException("Usuário não encontrado."));
  }
}
