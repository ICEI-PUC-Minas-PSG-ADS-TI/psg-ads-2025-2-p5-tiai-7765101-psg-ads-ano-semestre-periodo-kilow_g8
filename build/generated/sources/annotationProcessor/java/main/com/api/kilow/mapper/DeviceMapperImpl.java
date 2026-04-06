package com.api.kilow.mapper;

import com.api.kilow.dto.DeviceCreateDTO;
import com.api.kilow.dto.DeviceCreateResponseDTO;
import com.api.kilow.model.Device;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-05T12:38:34-0300",
    comments = "version: 1.5.5.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-9.3.1.jar, environment: Java 17.0.12 (Oracle Corporation)"
)
@Component
public class DeviceMapperImpl implements DeviceMapper {

    @Override
    public Device dtoToModel(DeviceCreateDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Device device = new Device();

        device.setName( dto.getName() );
        device.setConsumoWatts( dto.getConsumoWatts() );
        device.setHorasUsoDiario( dto.getHorasUsoDiario() );
        device.setDiasUsoSemana( dto.getDiasUsoSemana() );
        device.setValorTotalConsumo( dto.getValorTotalConsumo() );

        return device;
    }

    @Override
    public DeviceCreateResponseDTO modelToDto(Device model) {
        if ( model == null ) {
            return null;
        }

        DeviceCreateResponseDTO deviceCreateResponseDTO = new DeviceCreateResponseDTO();

        deviceCreateResponseDTO.setName( model.getName() );
        deviceCreateResponseDTO.setHorasUsoDiario( model.getHorasUsoDiario() );
        deviceCreateResponseDTO.setDiasUsoSemana( model.getDiasUsoSemana() );
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
            deviceCreateResponseDTO.setName( device.getName() );
            deviceCreateResponseDTO.setHorasUsoDiario( device.getHorasUsoDiario() );
            deviceCreateResponseDTO.setDiasUsoSemana( device.getDiasUsoSemana() );
            deviceCreateResponseDTO.setValorTotalConsumo( device.getValorTotalConsumo() );
        }

        return deviceCreateResponseDTO;
    }
}
