package com.api.kilow.dto.billing;

public record UpdateBillingRequest(
    String apelido,
    Integer mesReferencia,
    Integer anoReferencia,
    Double valorTotal,
    Double consumoTotalKwh) {}
