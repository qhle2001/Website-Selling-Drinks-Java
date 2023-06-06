package uit.project.finalproject.converter;

import org.springframework.stereotype.Component;
import uit.project.finalproject.dto.ProductDTO;
import uit.project.finalproject.entity.ProductEntity;

@Component
public class ProductConverter {
    public ProductEntity toEntity(ProductDTO dto){
        ProductEntity entity = new ProductEntity();
        entity.setTitle(dto.getTitle());
        entity.setSize(dto.getSize());
        entity.setContent(dto.getContent());
        entity.setShortdescription(dto.getShortdescription());
        entity.setThumbnall(dto.getThumbnall());
        return entity;
    }

    public ProductDTO toDTO(ProductEntity entity){
        ProductDTO dto = new ProductDTO();
        if(entity.getId() != null){
            dto.setId(entity.getId());
        }
        dto.setTitle(entity.getTitle());
        dto.setSize(entity.getSize());
        dto.setContent(entity.getContent());
        dto.setShortdescription(entity.getShortdescription());
        dto.setThumbnall(entity.getThumbnall());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setModifiedDate(entity.getModifiedDate());
        dto.setCreatedBy(entity.getCreatedBy());
//        dto.setCategoryCode(entity.getCategr().getCode());

        return dto;
    }

    public ProductEntity toEntity(ProductDTO dto, ProductEntity entity){
        entity.setTitle(dto.getTitle());
        entity.setSize(dto.getSize());
        entity.setContent(dto.getContent());
        entity.setShortdescription(dto.getShortdescription());
        entity.setThumbnall(dto.getThumbnall());

        return entity;
    }
}
