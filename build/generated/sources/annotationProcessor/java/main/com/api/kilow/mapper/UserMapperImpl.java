package com.api.kilow.mapper;

import com.api.kilow.dto.LoginResponseDTO;
import com.api.kilow.dto.UserCreateDTO;
import com.api.kilow.dto.UserCreateResponseDTO;
import com.api.kilow.model.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-05T12:38:35-0300",
    comments = "version: 1.5.5.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-9.3.1.jar, environment: Java 17.0.12 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User dtoToModel(UserCreateDTO dto) {
        if ( dto == null ) {
            return null;
        }

        User user = new User();

        user.setCpf( dto.getCpf() );
        user.setEmail( dto.getEmail() );
        user.setNome( dto.getNome() );
        user.setSenha( dto.getSenha() );

        return user;
    }

    @Override
    public UserCreateResponseDTO modelToDto(User model) {
        if ( model == null ) {
            return null;
        }

        UserCreateResponseDTO userCreateResponseDTO = new UserCreateResponseDTO();

        userCreateResponseDTO.setEmail( model.getEmail() );
        userCreateResponseDTO.setNome( model.getNome() );

        return userCreateResponseDTO;
    }

    @Override
    public LoginResponseDTO modelToResponseLoginDto(User user, String token) {
        if ( user == null && token == null ) {
            return null;
        }

        LoginResponseDTO loginResponseDTO = new LoginResponseDTO();

        if ( user != null ) {
            loginResponseDTO.setNome( user.getNome() );
        }
        loginResponseDTO.setToken( token );

        return loginResponseDTO;
    }
}
