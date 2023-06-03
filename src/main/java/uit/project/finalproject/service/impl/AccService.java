package uit.project.finalproject.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import uit.project.finalproject.converter.AccConverter;
import uit.project.finalproject.dto.AccDTO;
import uit.project.finalproject.entity.TypeAccEntity;
import uit.project.finalproject.entity.AccEntity;
import uit.project.finalproject.filter.repository.TypeAccRepository;
import uit.project.finalproject.filter.repository.AccRepository;
import uit.project.finalproject.service.iAccservice;

import java.util.ArrayList;
import java.util.List;
@Service
public class AccService implements iAccservice {
    @Autowired
    private AccRepository accRepository;
    @Autowired
    private TypeAccRepository typeAccRepository;
    @Autowired
    private AccConverter accConverter;
    @Override
    public AccDTO save(AccDTO accDTO) {
        AccEntity accEntity = new AccEntity();
        if(accDTO.getId() != null){
            AccEntity oldAccEntity = accRepository.findById(accDTO.getId()).orElse(null);
            accEntity = accConverter.toEntity(accDTO, oldAccEntity);
        }
        else{
            accEntity = accConverter.toEntity(accDTO);
        }
        TypeAccEntity typeAccEntity = typeAccRepository.findOneByCode(accDTO.getTypeaccCode());
        accEntity.setCustomer_account(typeAccEntity);
        accEntity = accRepository.save(accEntity);
        return accConverter.toDTO(accEntity);
    }
    @Override
    public void delete(long[] ids){
        for (long item: ids){
            accRepository.deleteById(item);
        }
    }

    @Override
    public List<AccDTO> findAll(Pageable pageable) {
        List<AccDTO> results = new ArrayList<>();
        List<AccEntity> entities = accRepository.findAll(pageable).getContent();
        for(AccEntity item: entities){
            AccDTO accDTO = accConverter.toDTO(item);
            results.add(accDTO);
        }
        return results;
    }

    @Override
    public int totalItem() {
        return (int) accRepository.count();
    }
}
