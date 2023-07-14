package uit.project.finalproject.service;

import org.springframework.data.domain.Pageable;
import uit.project.finalproject.dto.CartDTO;

import java.util.List;

public interface iCartservice {
    CartDTO save(CartDTO cartDTO);

    void delete(long[] ids);
    List<CartDTO> findAll(Pageable pageable);
    List<CartDTO> findAll();
    int totalItem();

    List<CartDTO> findByaccId(Long accid, Pageable pageable);

    int countByaccId(long accid);
    List<CartDTO> findByAccId(Long accid);
}
