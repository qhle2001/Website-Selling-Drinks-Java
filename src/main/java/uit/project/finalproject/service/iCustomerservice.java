package uit.project.finalproject.service;

import org.springframework.data.domain.Pageable;
import uit.project.finalproject.dto.CustomerDTO;

import java.util.List;

public interface iCustomerservice {
    CustomerDTO save(CustomerDTO customerDTO);

    void delete(long[] ids);
    List<CustomerDTO> findAll(Pageable pageable);
    int totalItem();

    List<CustomerDTO> findAll();
}
