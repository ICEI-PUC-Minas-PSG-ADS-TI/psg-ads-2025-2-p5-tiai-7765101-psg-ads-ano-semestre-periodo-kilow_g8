package com.api.kilow.dto.billing;

public record GetBillingResponse(
    Long id,
    String apelido,
    Integer mesReferencia,
    Integer anoReferencia,
    Double valorTotal,
    Double consumoTotalKwh,
    Double tarifaEfetiva) {}
