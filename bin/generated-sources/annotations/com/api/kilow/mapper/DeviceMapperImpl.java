package com.api.kilow.mapper;

import com.api.kilow.dto.DeviceCreateDTO;
import com.api.kilow.dto.DeviceCreateResponseDTO;
import com.api.kilow.model.Device;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-06T07:03:58-0300",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class DeviceMapperImpl implements DeviceMapper {

    @Override
    public Device dtoToModel(DeviceCreateDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Device device = new Device();

        device.setConsumoWatts( dto.getConsumoWatts() );
        device.setDiasUsoSemana( dto.getDiasUsoSemana() );
        device.setHorasUsoDiario( dto.getHorasUsoDiario() );
        device.setName( dto.getName() );
        device.setValorTotalConsumo( dto.getValorTotalConsumo() );

        return device;
    }

    @Override
    public DeviceCreateResponseDTO modelToDto(Device model) {
        if ( model == null ) {
            return null;
        }

        DeviceCreateResponseDTO deviceCreateResponseDTO = new DeviceCreateResponseDTO();

        deviceCreateResponseDTO.setDiasUsoSemana( model.getDiasUsoSemana() );
        deviceCreateResponseDTO.setHorasUsoDiario( model.getHorasUsoDiario() );
        deviceCreateResponseDTO.setName( model.getName() );
        deviceCreateResponseDTO.setValorTotalConsumo( model.getValorTotalConsumo() );

        return deviceCreateResponseDTO;
    }

    @Override
    public DeviceCreateResponseDTO modelToResponseUserCreateDto(Device device, String token) {
        if ( device == null && token == null ) {
            return null;
        }

        DeviceCreateResponseDTO deviceCreateResponseDTO = new DeviceCreateResponseDTO();

        if ( device != null ) {
            deviceCreateResponseDTO.setDiasUsoSemana( device.getDiasUsoSemana() );
            deviceCreateResponseDTO.setHorasUsoDiario( device.getHorasUsoDiario() );
            deviceCreateResponseDTO.setName( device.getName() );
            deviceCreateResponseDTO.setValorTotalConsumo( device.getValorTotalConsumo() );
        }

        return deviceCreateResponseDTO;
    }
}
