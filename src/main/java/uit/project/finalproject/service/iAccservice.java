package uit.project.finalproject.service;

import org.springframework.data.domain.Pageable;
import uit.project.finalproject.dto.AccDTO;
import uit.project.finalproject.dto.CategoryDTO;
import uit.project.finalproject.entity.AccEntity;

import java.util.List;

public interface iAccservice {
    AccDTO save(AccDTO accDTO);

    void delete(long[] ids);
    List<AccDTO> findAll(Pageable pageable);
    List<AccDTO> findAll();
    int totalItem();
    AccDTO getAccByUsername(String username);
}
