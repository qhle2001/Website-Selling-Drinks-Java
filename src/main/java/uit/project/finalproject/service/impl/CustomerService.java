package uit.project.finalproject.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import uit.project.finalproject.converter.CustomerConverter;
import uit.project.finalproject.dto.CustomerDTO;
import uit.project.finalproject.entity.CustomerEntity;
import uit.project.finalproject.entity.AccEntity;
import uit.project.finalproject.filter.repository.CustomerRepository;
import uit.project.finalproject.filter.repository.AccRepository;
import uit.project.finalproject.service.iCustomerservice;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomerService implements iCustomerservice{
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private AccRepository accRepository;
    @Autowired
    private CustomerConverter customerConverter;
    @Override
    public CustomerDTO save(CustomerDTO customerDTO) {
        CustomerEntity customerEntity = new CustomerEntity();
        if(customerDTO.getId() != null){
            CustomerEntity oldCustomerEntity = customerRepository.findById(customerDTO.getId()).orElse(null);
            customerEntity = customerConverter.toEntity(customerDTO, oldCustomerEntity);
        }
        else{
            customerEntity = customerConverter.toEntity(customerDTO);
        }
        AccEntity accEntity = accRepository.findOneByUsername(customerDTO.getUsername());
        customerEntity.setAccount(accEntity);
        customerEntity = customerRepository.save(customerEntity);
        return customerConverter.toDTO(customerEntity);
    }
    @Override
    public void delete(long[] ids){
        for (long item: ids){
            customerRepository.deleteById(item);
        }
    }

    @Override
    public List<CustomerDTO> findAll(Pageable pageable) {
        List<CustomerDTO> results = new ArrayList<>();
        List<CustomerEntity> entities = customerRepository.findAll(pageable).getContent();
        for(CustomerEntity item: entities){
            CustomerDTO customerDTO = customerConverter.toDTO(item);
            results.add(customerDTO);
        }
        return results;
    }

    @Override
    public int totalItem() {
        return (int) customerRepository.count();
    }
    @Override
    public List<CustomerDTO> findAll() {
        List<CustomerDTO> results = new ArrayList<>();
        List<CustomerEntity> entities = customerRepository.findAll();
        for(CustomerEntity item: entities){
            CustomerDTO customerDTO = customerConverter.toDTO(item);
            results.add(customerDTO);
        }
        return results;
    }
}
