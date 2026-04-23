package com.api.kilow.dto.billing;

public record CreateBillingResponse(
    Long id, String apelido, Integer mesReferencia, Integer anoReferencia, Double tarifaEfetiva) {}
