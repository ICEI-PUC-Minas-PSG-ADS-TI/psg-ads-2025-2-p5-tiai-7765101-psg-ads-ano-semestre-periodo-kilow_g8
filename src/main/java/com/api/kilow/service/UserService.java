package com.api.kilow.service;

import com.api.kilow.dto.LoginRequestDTO;
import com.api.kilow.dto.LoginResponseDTO;
import com.api.kilow.dto.UserCreateDTO;
import com.api.kilow.dto.UserCreateResponseDTO;
import com.api.kilow.mapper.UserMapper;
import com.api.kilow.model.User;
import com.api.kilow.repository.UserRepository;
import org.antlr.v4.runtime.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenService tokenService;

    public UserCreateResponseDTO createUser(UserCreateDTO requestDTO){
        User newUserModel = userMapper.dtoToModel(requestDTO);

        newUserModel.setSenha(passwordEncoder.encode(newUserModel.getSenha()));

        User savedUser= userRepository.save(newUserModel);

        return userMapper.modelToDto(savedUser);
    }

    public List<UserCreateResponseDTO> getAllUsers(){
        return userRepository.findAll().stream()
                .map(userMapper::modelToDto)
                .toList();
    }

    public LoginResponseDTO login(LoginRequestDTO requestDTO){
        var user = userRepository.findByEmail(requestDTO.getEmail())
                .orElseThrow(()-> new RuntimeException("Usuário não encontrado"));

        if(passwordEncoder.matches(requestDTO.getSenha(), user.getSenha())){
            String token = tokenService.generateToken(user);

            return userMapper.modelToResponseLoginDto(user, token);
        }else{
            throw new RuntimeException("Senha inválida");
        }
    }
}
