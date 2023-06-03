package uit.project.finalproject.converter;

import org.springframework.stereotype.Component;
import uit.project.finalproject.dto.CustomerDTO;
import uit.project.finalproject.entity.CustomerEntity;


@Component
public class CustomerConverter {
    public CustomerEntity toEntity(CustomerDTO dto){
        CustomerEntity entity = new CustomerEntity();
        entity.setFirstname(dto.getFirstname());
        entity.setLastname(dto.getLastname());
        entity.setDayofbirth(dto.getDayofbirth());
        entity.setParticipantdate(dto.getParticipantdate());
        entity.setHomeaddress(dto.getHomeaddress());
        entity.setPicture(dto.getPicture());

        return entity;
    }

    public CustomerDTO toDTO(CustomerEntity entity){
        CustomerDTO dto = new CustomerDTO();
        if(entity.getId() != null){
            dto.setId(entity.getId());
        }
        dto.setFirstname(entity.getFirstname());
        dto.setLastname(entity.getLastname());
        dto.setDayofbirth(entity.getDayofbirth());
        dto.setParticipantdate(entity.getParticipantdate());
        dto.setHomeaddress(entity.getHomeaddress());
        dto.setPicture(entity.getPicture());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setModifiedDate(entity.getModifiedDate());
        dto.setCreatedBy(entity.getCreatedBy());
        return dto;
    }

    public CustomerEntity toEntity(CustomerDTO dto, CustomerEntity entity){
        entity.setFirstname(dto.getFirstname());
        entity.setLastname(dto.getLastname());
        entity.setDayofbirth(dto.getDayofbirth());
        entity.setParticipantdate(dto.getParticipantdate());
        entity.setHomeaddress(dto.getHomeaddress());
        entity.setPicture(dto.getPicture());
        return entity;
    }
}
