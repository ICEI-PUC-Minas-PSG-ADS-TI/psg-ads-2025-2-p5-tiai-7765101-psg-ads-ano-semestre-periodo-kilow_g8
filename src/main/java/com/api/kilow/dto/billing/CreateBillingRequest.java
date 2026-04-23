package com.api.kilow.dto.billing;

import jakarta.validation.constraints.*;

public record CreateBillingRequest(
    @Size(min = 2, message = "O apelido deve conter ao menos dois caracteres") String apelido,
    @NotNull(message = "O mês referente deve ser informado")
        @Min(value = 1, message = "Um ano possui de 1 a 12 meses")
        @Max(value = 12, message = "Um ano possui de 1 a 12 meses")
        Integer mesReferencia,
    @NotNull(message = "O ano referente deve ser informado")
        @Min(value = 2000, message = "Ano inválido")
        Integer anoReferencia,
    @DecimalMin(value = "1", message = "A conta der luz deve custar ao menos R$1,00")
        @NotNull(message = "O valor total da conta de luz deve ser informado")
        Double valorTotal,
    @DecimalMin(
            value = "0.1",
            message = "A conta de luz deve ter consumido ao menos 0.1 kWh (quilowatt-hora)")
        @NotNull(message = "O consumo total deve ser informado")
        Double consumoTotalKwh) {}
