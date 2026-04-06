package com.api.kilow.mapper;
import com.api.kilow.dto.DeviceCreateDTO;
import com.api.kilow.dto.DeviceCreateResponseDTO;
import com.api.kilow.model.Device;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface DeviceMapper {
    Device dtoToModel(DeviceCreateDTO dto);
    DeviceCreateResponseDTO modelToDto(Device model);
    DeviceCreateResponseDTO modelToResponseUserCreateDto(Device device, String token);
}
