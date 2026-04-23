package com.api.kilow.service;

import com.api.kilow.dto.device.*;
import com.api.kilow.exception.RulesException;
import com.api.kilow.model.Device;
import com.api.kilow.model.User;
import com.api.kilow.repository.DeviceRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeviceService {

  @Autowired private DeviceRepository deviceRepository;

  @Autowired private LoggedUserService loggedUserService;

  public CreateDeviceResponse createDevice(CreateDeviceRequest requestDTO) {
    User loggedUser = loggedUserService.getUser();

    Device device = new Device();
    device.setUser(loggedUser);
    device.setNome(requestDTO.nome());
    device.setConsumoWatts(requestDTO.consumoWatts());
    device.setUsoDiasSemana(requestDTO.usoDiasSemana());
    device.setUsoMinutosHorasDia(requestDTO.usoMinutosHorasDia());

    Device createdDevice = deviceRepository.save(device);

    return new CreateDeviceResponse(createdDevice.getNome(), createdDevice.getId());
  }

  public List<GetDeviceResponse> getAllDevices() {

    User loggedUser = loggedUserService.getUser();

    return deviceRepository.findByUser(loggedUser).stream()
        .map(
            device -> {
              Double kWhConsumption = getMonthlyKWhConsumption(device);

              return new GetDeviceResponse(
                  device.getId(),
                  device.getNome(),
                  device.getConsumoWatts(),
                  device.getUsoMinutosHorasDia(),
                  device.getUsoDiasSemana(),
                  kWhConsumption);
            })
        .toList();
  }

  public void deleteDevice(Long id) {
    Device deviceToDelete =
        deviceRepository
            .findById(id)
            .orElseThrow(
                () -> new RulesException("Dispositivo não encontrado. Verifique o ID digitado."));

    validateUser(deviceToDelete);

    deviceRepository.delete(deviceToDelete);
  }

  public UpdateDeviceResponse updateDevice(UpdateDeviceRequest requestDTO, Long deviceId) {
    Device deviceToUpdate =
        deviceRepository
            .findById(deviceId)
            .orElseThrow(() -> new RulesException("Dispositivo não encontrado"));

    validateUser(deviceToUpdate);

    deviceToUpdate.setNome(requestDTO.nome());
    deviceToUpdate.setConsumoWatts(requestDTO.consumoWatts());
    deviceToUpdate.setUsoDiasSemana(requestDTO.usoDiasSemana());
    deviceToUpdate.setUsoMinutosHorasDia(requestDTO.usoMinutosHorasDia());

    Device updatedDevice = deviceRepository.save(deviceToUpdate);

    Double updatedKWhConsumption = getMonthlyKWhConsumption(updatedDevice);

    return new UpdateDeviceResponse(
        updatedDevice.getNome(), updatedDevice.getId(), updatedKWhConsumption);
  }

  private Double getMonthlyKWhConsumption(Device device) {
    Double hoursPerDay = device.getUsoMinutosHorasDia() / 60.0;
    Double daysPerMonth = (device.getUsoDiasSemana() * 30.0) / 7.0;
    Double grossTotal = (device.getConsumoWatts() * hoursPerDay * daysPerMonth) / 1000.0;
    return Math.round(grossTotal * 100.0) / 100.0;
  }

  private void validateUser(Device device) {
    if (!device.getUser().getId().equals(loggedUserService.getUserId())) {
      throw new RulesException("Você não tem permissão para alterar este dispositivo.");
    }
  }
}
