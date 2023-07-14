package uit.project.finalproject.converter;

import org.springframework.stereotype.Component;
import uit.project.finalproject.dto.CartDTO;
import uit.project.finalproject.entity.CartEntity;

@Component
public class CartConverter {
    public CartEntity toEntity(CartDTO dto){
        CartEntity entity = new CartEntity();
        entity.setAccId(dto.getAccId());
        entity.setProductId(dto.getProductId());
        return entity;
    }

    public CartDTO toDTO(CartEntity entity){
        CartDTO dto = new CartDTO();
        if(entity.getId() != null){
            dto.setId(entity.getId());
        }
        dto.setAccId(entity.getAccId());
        dto.setProductId(entity.getProductId());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setModifiedDate(entity.getModifiedDate());
        dto.setCreatedBy(entity.getCreatedBy());
        return dto;
    }

    public CartEntity toEntity(CartDTO dto, CartEntity entity){
        entity.setAccId(dto.getAccId());
        entity.setProductId(dto.getProductId());
        return entity;
    }
}
