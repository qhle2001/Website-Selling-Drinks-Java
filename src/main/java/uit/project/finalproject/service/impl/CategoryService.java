package uit.project.finalproject.service.impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import uit.project.finalproject.converter.CategoryConverter;
import uit.project.finalproject.converter.ProductConverter;
import uit.project.finalproject.dto.CategoryDTO;
import uit.project.finalproject.dto.ProductDTO;
import uit.project.finalproject.entity.ProductEntity;
import uit.project.finalproject.entity.CategoryEntity;
import uit.project.finalproject.filter.repository.CategoryRepository;
import uit.project.finalproject.service.iCategoryservice;

import java.util.ArrayList;
import java.util.List;
@Service
public class CategoryService implements iCategoryservice{
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private CategoryConverter categoryConverter;
    @Autowired
    private ProductConverter productConverter;
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
    @Override
    public List<CategoryDTO> findAll() {
        List<CategoryEntity> categoryEntities = categoryRepository.findAll();
        List<CategoryDTO> categoryDTOs = new ArrayList<>();

        for (CategoryEntity categoryEntity : categoryEntities) {
            CategoryDTO categoryDTO = categoryConverter.toDTO(categoryEntity);

            // Lấy danh sách ProductEntity từ CategoryEntity
            List<ProductEntity> productEntities = categoryEntity.getProducts();

            // Chuyển đổi danh sách ProductEntity sang danh sách ProductDTO
            List<ProductDTO> productDTOs = new ArrayList<>();
            for (ProductEntity productEntity : productEntities) {
                ProductDTO productDTO = productConverter.toDTO(productEntity);
                productDTOs.add(productDTO);
            }

            // Set danh sách ProductDTO vào CategoryDTO
            categoryDTO.setProducts(productDTOs);

            categoryDTOs.add(categoryDTO);
        }

        return categoryDTOs;
    }

}
