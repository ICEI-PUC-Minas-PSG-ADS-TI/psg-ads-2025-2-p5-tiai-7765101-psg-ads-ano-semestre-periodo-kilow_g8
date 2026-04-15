package com.api.kilow.dto.device;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CreateDeviceRequestDTO {
    @NotBlank(message = "O nome não pode estar vazio")
    private String nome;

    @NotNull(message = "O tempo de uso diário é obrigatórios")
    @Min(value = 1, message = "O aparelho deve ser usado por pelo menos 1 minuto")
    @Max(value = 1440, message = "O dia só possui 24 horas")
    private Integer usoMinutosHorasDia;

    @NotNull(message = "Os dias de uso semanal são obrigatórias")
    @Max(value = 7, message = "Uma semana não possui mais que 7 dias")
    @Min(value = 0, message = "O número de dias não pode ser negativo")
    private Integer usoDiasSemana;

    @NotNull(message = "O consumo do dispositivo é obrigatório")
    @DecimalMin(value = "0.1", message = "O consumo deve ser de pelo menos 0.1W")
    private Double consumoWatts;

}
