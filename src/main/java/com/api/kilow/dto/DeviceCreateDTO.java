package com.api.kilow.dto;

import lombok.Data;

@Data
public class DeviceCreateDTO {
    private String name;
    private Double consumoWatts;
    private Integer horasUsoDiario;
    private Integer diasUsoSemana;
    private Integer valorTotalConsumo;
}
