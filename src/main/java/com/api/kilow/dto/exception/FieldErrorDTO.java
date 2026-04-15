package com.api.kilow.dto.exception;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FieldErrorDTO {
    private String campo;
    private String mensagem;
}
