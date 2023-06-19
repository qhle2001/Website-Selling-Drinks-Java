package uit.project.finalproject.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import uit.project.finalproject.converter.AccConverter;
import uit.project.finalproject.converter.CustomerConverter;
import uit.project.finalproject.dto.AccDTO;
import uit.project.finalproject.dto.CustomerDTO;
import uit.project.finalproject.entity.AccEntity;
import uit.project.finalproject.entity.CustomerEntity;
import uit.project.finalproject.filter.repository.AccRepository;
import uit.project.finalproject.service.iAccservice;

import java.util.ArrayList;
import java.util.List;

@Service
public class AccService implements iAccservice {
    @Autowired
    private AccRepository accRepository;
    @Autowired
    private AccConverter accConverter;
    @Autowired
    private CustomerConverter customerConverter;

    @Override
    public AccDTO save(AccDTO accDTO) {
        AccEntity accEntity;
        if (accDTO.getId() != null) {
            AccEntity oldAccEntity = accRepository.findById(accDTO.getId()).orElse(null);
            accEntity = accConverter.toEntity(accDTO, oldAccEntity);
        } else {
            accEntity = accConverter.toEntity(accDTO);
        }
        accEntity = accRepository.save(accEntity);
        return accConverter.toDTO(accEntity);
    }

    @Override
    public void delete(long[] ids) {
        for (long item : ids) {
            accRepository.deleteById(item);
        }
    }

    @Override
    public List<AccDTO> findAll(Pageable pageable) {
        List<AccDTO> results = new ArrayList<>();
        List<AccEntity> entities = accRepository.findAll(pageable).getContent();
        for (AccEntity item : entities) {
            AccDTO accDTO = accConverter.toDTO(item);
            results.add(accDTO);
        }
        return results;
    }

    @Override
    public int totalItem() {
        return (int) accRepository.count();
    }

    @Override
    public AccDTO getAccByUsername(String username) {
        AccEntity accEntity = accRepository.findOneByUsername(username);
        return accConverter.toDTO(accEntity);
    }

    @Override
    public List<AccDTO> findAll() {
        List<AccEntity> accEntities = accRepository.findAll();
        List<AccDTO> accDTOs = new ArrayList<>();

        for (AccEntity accEntity : accEntities) {
            AccDTO accDTO = accConverter.toDTO(accEntity);

            // Lấy danh sách CustomerEntity từ AccEntity
            List<CustomerEntity> customerEntities = (List<CustomerEntity>) accEntity.getCustomer();

            // Chuyển đổi danh sách CustomerEntity sang danh sách CustomerDTO
            List<CustomerDTO> customerDTOs = new ArrayList<>();
            for (CustomerEntity customerEntity : customerEntities) {
                CustomerDTO customerDTO = customerConverter.toDTO(customerEntity);
                customerDTOs.add(customerDTO);
            }

            // Set danh sách CustomerDTO vào AccDTO
            accDTO.setCustomers(customerDTOs);

            accDTOs.add(accDTO);
        }

        return accDTOs;
    }
}
