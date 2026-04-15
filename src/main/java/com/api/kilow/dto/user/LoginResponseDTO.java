package com.api.kilow.dto.user;

import lombok.Data;

@Data
public class LoginResponseDTO {
    private String token;
    private String nome;
}
