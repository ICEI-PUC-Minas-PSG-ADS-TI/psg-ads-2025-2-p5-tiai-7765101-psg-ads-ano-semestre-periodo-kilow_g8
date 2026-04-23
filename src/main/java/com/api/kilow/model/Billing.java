package com.api.kilow.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "tb_billing")
public class Billing {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String apelido;

  @Column(nullable = false)
  private Integer mesReferencia;

  @Column(nullable = false)
  private Integer anoReferencia;

  @Column(nullable = false)
  private Double valorTotal;

  @Column(nullable = false)
  private Double consumoTotalKwh;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @Transient private Double tarifaEfetiva;
}
