package uit.project.finalproject.converter;

import org.springframework.stereotype.Component;
import uit.project.finalproject.dto.ProductDTO;
import uit.project.finalproject.entity.ProductEntity;

@Component
public class ProductConverter {
    public ProductEntity toEntity(ProductDTO dto){
        ProductEntity entity = new ProductEntity();
        entity.setTitle(dto.getTitle());
        entity.setContent(dto.getContent());
        entity.setShortdescription(dto.getShortdescription());
        entity.setThumbnall(dto.getThumbnall());

        return entity;
    }

    public ProductDTO toDTO(ProductEntity entity){
        ProductDTO dto = new ProductDTO();
        dto.setTitle(entity.getTitle());
        dto.setContent(entity.getContent());
        dto.setShortdescription(entity.getShortdescription());
        dto.setThumbnall(entity.getThumbnall());
        return dto;
    }

    public ProductEntity toEntity(ProductDTO dto, ProductEntity entity){
        entity.setTitle(dto.getTitle());
        entity.setContent(dto.getContent());
        entity.setShortdescription(dto.getShortdescription());
        entity.setThumbnall(dto.getThumbnall());

        return entity;
    }
}
