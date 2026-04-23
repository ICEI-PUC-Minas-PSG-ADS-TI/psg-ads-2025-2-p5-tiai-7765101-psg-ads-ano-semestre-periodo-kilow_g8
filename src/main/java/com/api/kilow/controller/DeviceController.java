package com.api.kilow.controller;

import com.api.kilow.dto.device.*;
import com.api.kilow.service.DeviceService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/devices")
public class DeviceController {

  @Autowired DeviceService deviceService;

  @PostMapping("/register")
  public ResponseEntity<CreateDeviceResponse> createDevice(
      @Valid @RequestBody CreateDeviceRequest request) {
    CreateDeviceResponse device = deviceService.createDevice(request);

    return ResponseEntity.status(HttpStatus.CREATED).body(device);
  }

  @GetMapping("/getAll")
  public ResponseEntity<List<GetDeviceResponse>> getAllDevices() {
    List<GetDeviceResponse> allDevices = deviceService.getAllDevices();

    return ResponseEntity.ok(allDevices);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<Void> deleteDevice(@PathVariable Long id) {
    deviceService.deleteDevice(id);

    return ResponseEntity.noContent().build();
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<UpdateDeviceResponse> update(
      @PathVariable Long id, @Valid @RequestBody UpdateDeviceRequest request) {
    UpdateDeviceResponse updatedDevice = deviceService.updateDevice(request, id);
    return ResponseEntity.ok(updatedDevice);
  }
}
