package com.api.kilow.repository;

import com.api.kilow.model.Device;
import com.api.kilow.model.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceRepository extends JpaRepository<Device, Long> {
  List<Device> findByUser(User user);
}
