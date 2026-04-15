package com.api.kilow.dto.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class ErrorResponseDTO {
    private LocalDateTime timestamp;
    private Integer status;
    private String erro;
    private List<FieldErrorDTO> mensagens;
}
