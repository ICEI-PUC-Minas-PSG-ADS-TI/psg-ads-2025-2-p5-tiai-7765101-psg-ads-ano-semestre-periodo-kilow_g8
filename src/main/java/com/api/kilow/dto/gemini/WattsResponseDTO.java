package com.api.kilow.dto.gemini;

public record WattsResponseDTO(
    String nomeSugerido,
    Double consumoWattsEncontrado,
    Double consumoWattsSugeridoIA,
    String metodoBusca) {}
