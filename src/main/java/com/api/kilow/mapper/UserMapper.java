package com.api.kilow.mapper;

import com.api.kilow.dto.LoginResponseDTO;
import com.api.kilow.dto.UserCreateDTO;
import com.api.kilow.dto.UserCreateResponseDTO;
import com.api.kilow.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User dtoToModel(UserCreateDTO dto);

    UserCreateResponseDTO modelToDto(User model);

    @Mapping(target = "token", source = "token")
    LoginResponseDTO modelToResponseLoginDto(User user, String token);
}
