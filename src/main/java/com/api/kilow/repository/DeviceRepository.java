package com.api.kilow.repository;

import com.api.kilow.model.Device;
import com.api.kilow.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DeviceRepository extends JpaRepository<Device, Long> {
    Optional<Device> findByUser(User user);
}
