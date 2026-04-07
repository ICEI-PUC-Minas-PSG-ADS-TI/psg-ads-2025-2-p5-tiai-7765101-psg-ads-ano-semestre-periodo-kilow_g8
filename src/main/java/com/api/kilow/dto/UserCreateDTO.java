package com.api.kilow.dto;

import lombok.Data;

@Data
public class UserCreateDTO {
    private String cpf;
    private String email;
    private String nome;
    private String senha;
}
