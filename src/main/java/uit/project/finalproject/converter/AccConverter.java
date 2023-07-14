package uit.project.finalproject.converter;

import org.springframework.stereotype.Component;
import uit.project.finalproject.dto.AccDTO;
import uit.project.finalproject.entity.AccEntity;

@Component
public class AccConverter {
    public AccEntity toEntity(AccDTO dto){
        AccEntity entity = new AccEntity();
        entity.setUsername(dto.getUsername());
        entity.setPassword(dto.getPassword());
        entity.setPicture(dto.getPicture());
        entity.setCustomer_name(dto.getCustomer_name());

        return entity;
    }

    public AccDTO toDTO(AccEntity entity){
        AccDTO dto = new AccDTO();
        if(entity.getId() != null){
            dto.setId(entity.getId());
        }
        dto.setUsername(entity.getUsername());
        dto.setPassword(entity.getPassword());
        dto.setPicture(entity.getPicture());
        dto.setCustomer_name(entity.getCustomer_name());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setModifiedDate(entity.getModifiedDate());
        dto.setCreatedBy(entity.getCreatedBy());
        return dto;
    }

    public AccEntity toEntity(AccDTO dto, AccEntity entity){
        entity.setUsername(dto.getUsername());
        entity.setPassword(dto.getPassword());
        entity.setPicture(dto.getPicture());
        entity.setCustomer_name(dto.getCustomer_name());
        return entity;
    }
}
