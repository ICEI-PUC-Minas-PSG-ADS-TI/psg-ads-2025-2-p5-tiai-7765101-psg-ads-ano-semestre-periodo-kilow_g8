package com.api.kilow.dto.exception;

import java.time.LocalDateTime;
import java.util.List;

public record ErrorResponse(
    LocalDateTime timestamp, Integer status, String erro, List<FieldError> mensagens) {}
