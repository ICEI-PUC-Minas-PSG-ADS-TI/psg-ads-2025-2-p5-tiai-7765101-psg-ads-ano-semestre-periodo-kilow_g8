package com.api.kilow.dto.billing;

import java.util.List;

public record BillingListResponse(
    Integer total,
    List<GetBillingResponse> contas,
    GetBillingDetail contaMaisCara,
    Double tarifaMediaEfetiva) {}
