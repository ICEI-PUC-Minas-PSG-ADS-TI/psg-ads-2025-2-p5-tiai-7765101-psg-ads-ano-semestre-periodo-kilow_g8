package com.api.kilow.dto.gemini;

import jakarta.validation.constraints.NotBlank;

public record WattsRequestDTO(@NotBlank(message = "A URL não pode estar vazia")
                              String url) {}
