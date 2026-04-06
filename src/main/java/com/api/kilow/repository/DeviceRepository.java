package com.api.kilow.repository;

import com.api.kilow.model.Device; // Importa o modelo de Dispositivo
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {
    
    // Exemplo: Buscar todos os dispositivos pelo nome
    List<Device> findByNameContaining(String name);

    // Se você quiser buscar dispositivos de um usuário específico no futuro:
    // List<Device> findByUserId(Long userId);
}