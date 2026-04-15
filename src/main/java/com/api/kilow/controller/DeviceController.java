package com.api.kilow.controller;

import com.api.kilow.dto.device.CreateDeviceRequestDTO;
import com.api.kilow.dto.device.CreateDeviceResponseDTO;
import com.api.kilow.dto.device.GetDeviceResponseDTO;
import com.api.kilow.service.DeviceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/devices")
public class DeviceController {

    @Autowired
    DeviceService deviceService;

    @PostMapping("/register")
    public ResponseEntity<CreateDeviceResponseDTO> createDevice (@Valid @RequestBody CreateDeviceRequestDTO request){
        CreateDeviceResponseDTO device = deviceService.createDevice(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(device);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<GetDeviceResponseDTO>> getAllDevices(){
        List<GetDeviceResponseDTO> allDevices = deviceService.getAllDevices();

        return ResponseEntity.ok(allDevices);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteDevice(@PathVariable Long id){
        deviceService.deleteDevice(id);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CreateDeviceResponseDTO> update(@PathVariable Long id, @Valid @RequestBody CreateDeviceRequestDTO bodyRequest){
        CreateDeviceResponseDTO updatedDevice = deviceService.updateDevice(bodyRequest, id);
        return ResponseEntity.ok(updatedDevice);
    }

}
