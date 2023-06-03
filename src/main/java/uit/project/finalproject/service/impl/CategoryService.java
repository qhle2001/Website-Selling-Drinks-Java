package uit.project.finalproject.service.impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import uit.project.finalproject.converter.CategoryConverter;
import uit.project.finalproject.dto.CategoryDTO;
//import uit.project.finalproject.entity.AccEntity;
import uit.project.finalproject.entity.CategoryEntity;
import uit.project.finalproject.filter.repository.AccRepository;
import uit.project.finalproject.filter.repository.CategoryRepository;
import uit.project.finalproject.service.iCategoryservice;

import java.util.ArrayList;
import java.util.List;
@Service
public class CategoryService implements iCategoryservice{
    @Autowired
    private CategoryRepository categoryRepository;
//    @Autowired
//    private AccRepository accRepository;
    @Autowired
    private CategoryConverter categoryConverter;
//    @Override
//    public CategoryDTO save(CategoryDTO categoryDTO){
//        return null;
//    }
    @Override
    public CategoryDTO save(CategoryDTO categoryDTO) {
        CategoryEntity categoryEntity = new CategoryEntity();
        if(categoryDTO.getId() != null){
            CategoryEntity oldCategoryEntity = categoryRepository.findById(categoryDTO.getId()).orElse(null);
            categoryEntity = categoryConverter.toEntity(categoryDTO, oldCategoryEntity);
        }
        else{
            categoryEntity = categoryConverter.toEntity(categoryDTO);
        }
//        AccEntity accEntity = accRepository.findOneByUsername(categoryDTO.getUsername());
//        categoryEntity.setAccount(accEntity);
        categoryEntity = categoryRepository.save(categoryEntity);
        return categoryConverter.toDTO(categoryEntity);
    }
    @Override
    public void delete(long[] ids){
        for (long item: ids){
            categoryRepository.deleteById(item);
        }
    }

    @Override
    public List<CategoryDTO> findAll(Pageable pageable) {
        List<CategoryDTO> results = new ArrayList<>();
        List<CategoryEntity> entities = categoryRepository.findAll(pageable).getContent();
        for(CategoryEntity item: entities){
            CategoryDTO categoryDTO = categoryConverter.toDTO(item);
            results.add(categoryDTO);
        }
        return results;
    }

    @Override
    public int totalItem() {
        return (int) categoryRepository.count();
    }
}
