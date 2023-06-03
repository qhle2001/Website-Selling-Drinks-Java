package uit.project.finalproject.converter;

import org.springframework.stereotype.Component;
import uit.project.finalproject.dto.CategoryDTO;
import uit.project.finalproject.entity.CategoryEntity;

@Component
public class CategoryConverter {
    public CategoryEntity toEntity(CategoryDTO dto){
        CategoryEntity entity = new CategoryEntity();
        entity.setName(dto.getName());
        entity.setCode(dto.getCode());
        return entity;
    }

    public CategoryDTO toDTO(CategoryEntity entity){
        CategoryDTO dto = new CategoryDTO();
        if(entity.getId() != null){
            dto.setId(entity.getId());
        }
        dto.setName(entity.getName());
        dto.setCode(entity.getCode());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setModifiedDate(entity.getModifiedDate());
        dto.setCreatedBy(entity.getCreatedBy());
        return dto;
    }

    public CategoryEntity toEntity(CategoryDTO dto, CategoryEntity entity){
        entity.setCode(dto.getCode());
        entity.setName(dto.getName());
        return entity;
    }
}
