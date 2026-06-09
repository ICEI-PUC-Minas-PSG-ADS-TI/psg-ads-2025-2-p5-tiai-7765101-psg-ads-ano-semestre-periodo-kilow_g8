package com.api.kilow.mapper;

import com.api.kilow.dto.user.LoginResponse;
import com.api.kilow.dto.user.UserCreate;
import com.api.kilow.dto.user.UserCreateResponse;
import com.api.kilow.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
  User dtoToModel(UserCreate dto);

  UserCreateResponse modelToDto(User model);

  @Mapping(target = "token", source = "token")
  LoginResponse modelToResponseLoginDto(User user, String token);
}
