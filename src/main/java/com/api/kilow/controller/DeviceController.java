package com.api.kilow.controller;

import com.api.kilow.dto.DeviceCreateDTO;
import com.api.kilow.dto.DeviceCreateResponseDTO;
import com.api.kilow.service.DeviceService; // Import correto do Service
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/devices") // Define um caminho base para os endpoints
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @PostMapping("/register") // O caminho final será /api/devices/register
    public ResponseEntity<DeviceCreateResponseDTO> createDevice(@RequestBody DeviceCreateDTO dtoRequest) {
        DeviceCreateResponseDTO savedDevice = deviceService.createDevice(dtoRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedDevice);
    }

    @GetMapping("/all") // O caminho final será /api/devices/all
    public ResponseEntity<List<DeviceCreateResponseDTO>> getAllDevices() {
        List<DeviceCreateResponseDTO> devices = deviceService.getAllDevices();
        return ResponseEntity.ok(devices);
    }
}