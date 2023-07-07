package uit.project.finalproject.service;

import org.springframework.data.domain.Pageable;
import uit.project.finalproject.dto.ProductDTO;

import java.util.List;

public interface iProductservice {
    ProductDTO save(ProductDTO productDTO);

    void delete(long[] ids);
    List<ProductDTO> findAll(Pageable pageable);
    int totalItem();
    List<ProductDTO> findAll();
    ProductDTO findById(long id);
    int countByCategrId(long categoryId);
    List<ProductDTO> findByCategrId(long categoryId, Pageable pageable);
//    List<ProductDTO> findByCategoryId(long categoryId);
}
