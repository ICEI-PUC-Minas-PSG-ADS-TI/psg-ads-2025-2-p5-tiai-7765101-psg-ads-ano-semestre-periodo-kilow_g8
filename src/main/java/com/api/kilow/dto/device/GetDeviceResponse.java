package com.api.kilow.dto.device;

public record GetDeviceResponse(
    Long id,
    String nome,
    Double consumoWatts,
    Integer usoMinutosHorasDia,
    Integer usoDiasSemana,
    Double consumoMensalKWh) {}
