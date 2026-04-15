package com.api.kilow.mapper;

import com.api.kilow.dto.device.CreateDeviceRequestDTO;
import com.api.kilow.dto.device.CreateDeviceResponseDTO;
import com.api.kilow.dto.device.GetDeviceResponseDTO;
import com.api.kilow.model.Device;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface DeviceMapper {
    Device dtoToModel(CreateDeviceRequestDTO dto);

    @Mapping(target = "consumoMensalKWh", ignore = true)
    GetDeviceResponseDTO modelToGetResponseDto(Device model);

    CreateDeviceResponseDTO modelToCreateResponseDto(Device model);

}
