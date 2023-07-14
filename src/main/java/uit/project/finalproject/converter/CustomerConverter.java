package uit.project.finalproject.converter;

import org.springframework.stereotype.Component;
import uit.project.finalproject.dto.CustomerDTO;
import uit.project.finalproject.entity.CustomerEntity;
import uit.project.finalproject.entity.AccEntity;


@Component
public class CustomerConverter {
    public CustomerEntity toEntity(CustomerDTO dto){
        CustomerEntity entity = new CustomerEntity();
        entity.setFullname(dto.getFullname());
        entity.setEmail(dto.getEmail());
        entity.setPhonenumber(dto.getPhonenumber());
        entity.setHomeaddress(dto.getHomeaddress());

        if (dto.getAccount_id() != null) {
            AccEntity accEntity = new AccEntity();
            accEntity.setId(dto.getAccount_id());
            entity.setAccount(accEntity);
        }

        return entity;
    }

    public CustomerDTO toDTO(CustomerEntity entity){
        CustomerDTO dto = new CustomerDTO();
        if(entity.getId() != null){
            dto.setId(entity.getId());
        }
        dto.setFullname(entity.getFullname());
        dto.setEmail(entity.getEmail());
        dto.setPhonenumber(entity.getPhonenumber());
        dto.setHomeaddress(entity.getHomeaddress());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setModifiedDate(entity.getModifiedDate());
        dto.setCreatedBy(entity.getCreatedBy());

        AccEntity accEntity = entity.getAccount();
        if (accEntity != null) {
            dto.setAccount_id(accEntity.getId());
            // Thực hiện việc lấy categoryCode từ categoryEntity và gán cho dto
            dto.setUsername(accEntity.getUsername());
        }

//        dto.setUsername(entity.getAccount().getUsername());
        return dto;
    }

    public CustomerEntity toEntity(CustomerDTO dto, CustomerEntity entity){
        entity.setFullname(dto.getFullname());
        entity.setEmail(dto.getEmail());
        entity.setPhonenumber(dto.getPhonenumber());
        entity.setHomeaddress(dto.getHomeaddress());

        if (dto.getAccount_id() != null) {
            AccEntity accEntity = new AccEntity();
            accEntity.setId(dto.getAccount_id());
            entity.setAccount(accEntity);
        }

        return entity;
    }
}
