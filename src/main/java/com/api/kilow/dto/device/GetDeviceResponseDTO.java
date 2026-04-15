package com.api.kilow.dto.device;

import lombok.Data;

@Data
public class GetDeviceResponseDTO {
    private Long id;
    private String nome;
    private Double consumoWatts;
    private Integer usoMinutosHorasDia;
    private Integer usoDiasSemana;

    private Double consumoMensalKWh;

}
