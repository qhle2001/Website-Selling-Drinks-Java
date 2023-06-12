package uit.project.finalproject.converter;

import org.springframework.stereotype.Component;
import uit.project.finalproject.dto.OrderDTO;
import uit.project.finalproject.entity.OrderEntity;
@Component
public class OrderConverter {
    public OrderEntity toEntity(OrderDTO dto){
        OrderEntity entity = new OrderEntity();
        entity.setProductname(dto.getProductname());
        entity.setSize(dto.getSize());
        entity.setQuantity(dto.getQuantity());
        entity.setHomeaddress(dto.getHomeaddress());
        entity.setCustomername(dto.getCustomername());
        entity.setPhonenumber(dto.getPhonenumber());

        return entity;
    }

    public OrderDTO toDTO(OrderEntity entity){
        OrderDTO dto = new OrderDTO();
        if(entity.getId() != null){
            dto.setId(entity.getId());
        }
        dto.setProductname(entity.getProductname());
        dto.setSize(entity.getSize());
        dto.setQuantity(entity.getQuantity());
        dto.setHomeaddress(entity.getHomeaddress());
        dto.setCustomername(entity.getCustomername());
        dto.setPhonenumber(entity.getPhonenumber());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setModifiedDate(entity.getModifiedDate());
        dto.setCreatedBy(entity.getCreatedBy());
        return dto;
    }

    public OrderEntity toEntity(OrderDTO dto, OrderEntity entity){
        entity.setProductname(dto.getProductname());
        entity.setSize(dto.getSize());
        entity.setQuantity(dto.getQuantity());
        entity.setHomeaddress(dto.getHomeaddress());
        entity.setCustomername(dto.getCustomername());
        entity.setPhonenumber(dto.getPhonenumber());
        return entity;
    }
}
