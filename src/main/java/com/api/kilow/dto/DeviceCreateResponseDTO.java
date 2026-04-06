package com.api.kilow.dto;

import lombok.Data;

@Data
public class DeviceCreateResponseDTO {
    private String name;
    private String consumoWhatts;
    private Integer horasUsoDiario;
    private Integer diasUsoSemana;
    private Integer valorTotalConsumo;
}
