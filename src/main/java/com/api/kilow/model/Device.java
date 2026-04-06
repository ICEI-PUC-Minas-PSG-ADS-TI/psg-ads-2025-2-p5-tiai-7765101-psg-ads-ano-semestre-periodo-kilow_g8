package com.api.kilow.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="tb_device")
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double consumoWatts; // Mudado para Double para cálculos

    @Column(nullable = false)
    private Integer horasUsoDiario; // Mudado para Integer

    @Column(nullable = false)
    private Integer diasUsoSemana; // Mudado para Integer

    @Column(nullable = false)
    private Integer valorTotalConsumo; // Mudado para Integer

    // Se você quiser que o dispositivo pertença a um usuário:
    // @ManyToOne
    // @JoinColumn(name = "user_id")
    // private User user;
}