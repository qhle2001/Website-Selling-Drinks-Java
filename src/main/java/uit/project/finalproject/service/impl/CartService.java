package uit.project.finalproject.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import uit.project.finalproject.converter.CartConverter;
import uit.project.finalproject.dto.CartDTO;
import uit.project.finalproject.entity.CartEntity;
import uit.project.finalproject.filter.repository.CartRepository;
import uit.project.finalproject.service.iCartservice;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartService implements iCartservice {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartConverter cartConverter;

    @Override
    public CartDTO save(CartDTO cartDTO) {
        CartEntity cartEntity;
        if (cartDTO.getId() != null) {
            CartEntity oldCartEntity = cartRepository.findById(cartDTO.getId()).orElse(null);
            cartEntity = cartConverter.toEntity(cartDTO, oldCartEntity);
        } else {
            cartEntity = cartConverter.toEntity(cartDTO);
        }
        cartEntity = cartRepository.save(cartEntity);
        return cartConverter.toDTO(cartEntity);
    }

    @Override
    public void delete(long[] ids) {
        for (long item : ids) {
            cartRepository.deleteById(item);
        }
    }

    @Override
    public List<CartDTO> findAll(Pageable pageable) {
        List<CartDTO> results = new ArrayList<>();
        List<CartEntity> entities = cartRepository.findAll(pageable).getContent();
        for (CartEntity item : entities) {
            CartDTO cartDTO = cartConverter.toDTO(item);
            results.add(cartDTO);
        }
        return results;
    }

    @Override
    public List<CartDTO> findAll() {
        List<CartDTO> results = new ArrayList<>();
        List<CartEntity> entities = cartRepository.findAll();
        for(CartEntity item: entities){
            CartDTO cartDTO = cartConverter.toDTO(item);
            results.add(cartDTO);
        }
        return results;
    }

    @Override
    public int totalItem() {
        return (int) cartRepository.count();
    }

    @Override
    public List<CartDTO> findByaccId(Long accid, Pageable pageable) {
        List<CartDTO> results = new ArrayList<>();
        Page<CartEntity> entities = cartRepository.findByaccId(accid, pageable);
        for (CartEntity item : entities.getContent()) {
            CartDTO cartDTO = cartConverter.toDTO(item);
            results.add(cartDTO);
        }
        return results;
    }

    @Override
    public int countByaccId(long accid) {
        return cartRepository.countByaccId(accid);
    }
    @Override
    public List<CartDTO> findByAccId(Long accid) {
        List<CartDTO> results = new ArrayList<>();
        List<CartEntity> entities = cartRepository.findByAccId(accid);
        for (CartEntity item : entities) {
            CartDTO cartDTO = cartConverter.toDTO(item);
            results.add(cartDTO);
        }
        return results;
    }

}
