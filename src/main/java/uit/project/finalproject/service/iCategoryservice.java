package uit.project.finalproject.service;

import org.springframework.data.domain.Pageable;
import uit.project.finalproject.dto.CategoryDTO;

import java.util.List;

public interface iCategoryservice {
    CategoryDTO save(CategoryDTO categoryDTO);

    void delete(long[] ids);
    List<CategoryDTO> findAll(Pageable pageable);
    List<CategoryDTO> findAll();
    int totalItem();
}
