package com.api.kilow.dto.billing;

public record GetBillingDetail(
    String apelido,
    Integer mesReferencia,
    Integer anoReferencia,
    Double valorTotal,
    Double consumoTotalKwh,
    Double tarifaEfetiva) {}
