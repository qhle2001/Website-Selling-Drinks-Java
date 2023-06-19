package uit.project.finalproject.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import uit.project.finalproject.dto.ProductDTO;
import uit.project.finalproject.entity.ProductEntity;
import uit.project.finalproject.entity.CategoryEntity;
import uit.project.finalproject.filter.repository.CategoryRepository;

@Component
public class ProductConverter {
    @Autowired
    private CategoryRepository categoryRepository;
    public ProductEntity toEntity(ProductDTO dto){
        ProductEntity entity = new ProductEntity();
        entity.setTitle(dto.getTitle());
        entity.setPicture(dto.getPicture());

        if (dto.getCategory_id() != null) {
            CategoryEntity categoryEntity = new CategoryEntity();
            categoryEntity.setId(dto.getCategory_id());
            entity.setCategr(categoryEntity);
        }

        return entity;
    }

    public ProductDTO toDTO(ProductEntity entity){
        ProductDTO dto = new ProductDTO();
        if(entity.getId() != null){
            dto.setId(entity.getId());
        }
        dto.setTitle(entity.getTitle());
        dto.setPicture(entity.getPicture());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setModifiedDate(entity.getModifiedDate());
        dto.setCreatedBy(entity.getCreatedBy());

        CategoryEntity categoryEntity = entity.getCategr();
        if (categoryEntity != null) {
            dto.setCategory_id(categoryEntity.getId());
            // Thực hiện việc lấy categoryCode từ categoryEntity và gán cho dto
            dto.setCategoryCode(categoryEntity.getCode());
        }

        return dto;
    }

    public ProductEntity toEntity(ProductDTO dto, ProductEntity entity){
        entity.setTitle(dto.getTitle());
        entity.setPicture(dto.getPicture());

        if (dto.getCategory_id() != null) {
            CategoryEntity categoryEntity = new CategoryEntity();
            categoryEntity.setId(dto.getCategory_id());
            entity.setCategr(categoryEntity);
        }

        return entity;
    }
}
