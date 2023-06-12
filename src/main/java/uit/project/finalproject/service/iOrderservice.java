package uit.project.finalproject.service;

import org.springframework.data.domain.Pageable;
import uit.project.finalproject.dto.OrderDTO;

import java.util.List;

public interface iOrderservice {
    OrderDTO save(OrderDTO orderDTO);

    void delete(long[] ids);
    List<OrderDTO> findAll(Pageable pageable);
    int totalItem();
}
