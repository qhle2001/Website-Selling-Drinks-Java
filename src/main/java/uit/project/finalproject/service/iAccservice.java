package uit.project.finalproject.service;

import org.springframework.data.domain.Pageable;
import uit.project.finalproject.dto.AccDTO;

import java.util.List;

public interface iAccservice {
    AccDTO save(AccDTO accDTO);

    void delete(long[] ids);
    List<AccDTO> findAll(Pageable pageable);
    int totalItem();
}
