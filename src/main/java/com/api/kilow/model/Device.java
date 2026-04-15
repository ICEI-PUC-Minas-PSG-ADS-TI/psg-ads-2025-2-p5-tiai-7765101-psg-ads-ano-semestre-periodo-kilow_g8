package com.api.kilow.model;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="tb_device")
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private Integer usoMinutosHorasDia;

    @Column(nullable = false)
    private Integer usoDiasSemana;

    @Column(nullable = false)
    private Double consumoWatts;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Transient
    private Double consumoMensalKwh;

}
