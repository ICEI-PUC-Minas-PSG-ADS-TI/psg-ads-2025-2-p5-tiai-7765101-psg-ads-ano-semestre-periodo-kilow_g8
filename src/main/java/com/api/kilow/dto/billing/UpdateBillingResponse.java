package com.api.kilow.dto.billing;

public record UpdateBillingResponse(
    String apelido, Long id, Integer mesReferencia, Integer anoReferencia) {}
