package com.api.kilow.dto.device;

public record UpdateDeviceRequest(
    String nome, Double consumoWatts, Integer usoMinutosHorasDia, Integer usoDiasSemana) {}
