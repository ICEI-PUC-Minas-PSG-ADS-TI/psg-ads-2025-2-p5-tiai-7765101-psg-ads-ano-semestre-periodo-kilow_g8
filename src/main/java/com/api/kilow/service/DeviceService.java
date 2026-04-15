package com.api.kilow.service;

import com.api.kilow.dto.device.CreateDeviceRequestDTO;
import com.api.kilow.dto.device.CreateDeviceResponseDTO;
import com.api.kilow.dto.device.GetDeviceResponseDTO;
import com.api.kilow.exception.RulesException;
import com.api.kilow.mapper.DeviceMapper;
import com.api.kilow.model.Device;
import com.api.kilow.model.User;
import com.api.kilow.repository.DeviceRepository;
import com.api.kilow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private DeviceMapper deviceMapper;

    @Autowired
    private UserRepository userRepository;

    public CreateDeviceResponseDTO createDevice(CreateDeviceRequestDTO requestDTO) {
        Device device = deviceMapper.dtoToModel(requestDTO);

        User relatedUser = getRelatedUser();

        device.setUser(relatedUser);

        Device savedDevice = deviceRepository.save(device);

        return deviceMapper.modelToCreateResponseDto(savedDevice);
    }

    public List<GetDeviceResponseDTO> getAllDevices(){
        User relatedUser = getRelatedUser();

        return deviceRepository.findByUser(relatedUser)
                .stream()
                .map(device -> {
                    GetDeviceResponseDTO relatedDevice = deviceMapper.modelToGetResponseDto(device);
                    Double consumoKWh = getConsumoMensalKWh(device);
                    relatedDevice.setConsumoMensalKWh(consumoKWh);
                    return relatedDevice;
                }).toList();
    }

    public void deleteDevice(Long id){
        Device deviceToDelete = deviceRepository.findById(id)
                .orElseThrow(() -> new RulesException("Dispositivo não encontrado"));

        validateUser(deviceToDelete.getUser());

        deviceRepository.delete(deviceToDelete);
    }

    public CreateDeviceResponseDTO updateDevice (CreateDeviceRequestDTO requestDTO, Long deviceId) {
        Device deviceToUpdate = deviceRepository.findById(deviceId)
                .orElseThrow(()-> new RulesException("Dispositivo não encontrado"));

        validateUser(deviceToUpdate.getUser());

        deviceToUpdate.setNome(requestDTO.getNome());
        deviceToUpdate.setConsumoWatts(requestDTO.getConsumoWatts());
        deviceToUpdate.setUsoDiasSemana(requestDTO.getUsoDiasSemana());
        deviceToUpdate.setUsoMinutosHorasDia(requestDTO.getUsoMinutosHorasDia());

        Device updatedDevice = deviceRepository.save(deviceToUpdate);

        return deviceMapper.modelToCreateResponseDto(updatedDevice);
    }

    private User getRelatedUser (){
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RulesException("Acesso negado: Usuário não autenticado no sistema");
        }

        String relatedUserEmail = authentication.getName();

        return userRepository.findByEmail(relatedUserEmail)
                .orElseThrow(() -> new RulesException("Usuário não encontrado no banco de dados"));
    }

    private Double getConsumoMensalKWh(Device device){
        Double horasTotais = device.getUsoMinutosHorasDia() / 60.0;
        Integer diasTotais = device.getUsoDiasSemana() * 4;
        return (device.getConsumoWatts() * horasTotais * diasTotais) / 1000.0;
    }

    private void validateUser(User referenceUser){
        User tokenUser = getRelatedUser();

        if(!referenceUser.getId().equals(tokenUser.getId())){
            throw new RulesException("Acesso negado: Você não tem permissão para excluir este aparelho");
        }

    }

}
