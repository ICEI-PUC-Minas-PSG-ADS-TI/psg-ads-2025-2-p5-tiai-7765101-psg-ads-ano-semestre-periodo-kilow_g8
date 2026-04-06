package com.api.kilow.service;

import com.api.kilow.dto.DeviceCreateDTO;
import com.api.kilow.dto.DeviceCreateResponseDTO;
import com.api.kilow.mapper.DeviceMapper; // Certifique-se de ter um mapper específico
import com.api.kilow.model.Device;       // Importação da sua Model
import com.api.kilow.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private DeviceMapper deviceMapper; // Usando um mapper de Device

    public DeviceCreateResponseDTO createDevice(DeviceCreateDTO requestDTO) {
        // 1. Converte DTO para Model
        Device newDeviceModel = deviceMapper.dtoToModel(requestDTO);

        // 2. Calcula o consumo antes de salvar ou logo após
        Integer consumoArredondado = calculateConsumption(newDeviceModel);
        newDeviceModel.setValorTotalConsumo(consumoArredondado);

        // 3. Salva no banco de dados
        Device savedDevice = deviceRepository.save(newDeviceModel);

        // 4. Retorna o DTO de resposta
        return deviceMapper.modelToDto(savedDevice);
    }

    public Integer calculateConsumption(Device device) {
        double consumoKwhMensal = (device.getConsumoWatts() * device.getHorasUsoDiario() * device.getDiasUsoSemana() * 4.3) / 1000.0;
        return (int) Math.round(consumoKwhMensal);
    }

    public List<DeviceCreateResponseDTO> getAllDevices() {
        return deviceRepository.findAll().stream()
                .map(deviceMapper::modelToDto)
                .toList();
    }
}