package uit.project.finalproject.service.impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import uit.project.finalproject.converter.ProductConverter;
import uit.project.finalproject.dto.ProductDTO;
import uit.project.finalproject.entity.CategoryEntity;
import uit.project.finalproject.entity.ProductEntity;
import uit.project.finalproject.filter.repository.CategoryRepository;
import uit.project.finalproject.filter.repository.ProductRepository;
import uit.project.finalproject.service.iProductservice;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService implements iProductservice {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ProductConverter productConverter;
    @Override
    public ProductDTO save(ProductDTO productDTO) {
        ProductEntity productEntity = new ProductEntity();
        if(productDTO.getId() != null){
            ProductEntity oldProductEntity = productRepository.findById(productDTO.getId()).orElse(null);
            productEntity = productConverter.toEntity(productDTO, oldProductEntity);
        }
        else{
            productEntity = productConverter.toEntity(productDTO);
        }
        CategoryEntity categoryEntity = categoryRepository.findOneByCode(productDTO.getCategoryCode());
        productEntity.setCategr(categoryEntity);
        productEntity = productRepository.save(productEntity);
        return productConverter.toDTO(productEntity);
    }
    @Override
    public void delete(long[] ids){
        for (long item: ids){
            productRepository.deleteById(item);
        }
    }

    @Override
    public List<ProductDTO> findAll(Pageable pageable) {
        List<ProductDTO> results = new ArrayList<>();
        List<ProductEntity> entities = productRepository.findAll(pageable).getContent();
        for(ProductEntity item: entities){
            ProductDTO productDTO = productConverter.toDTO(item);
            results.add(productDTO);
        }
        return results;
    }

    @Override
    public int totalItem() {
        return (int) productRepository.count();
    }
}
