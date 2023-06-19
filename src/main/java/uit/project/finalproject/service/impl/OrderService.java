package uit.project.finalproject.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import uit.project.finalproject.converter.OrderConverter;
import uit.project.finalproject.dto.OrderDTO;
import uit.project.finalproject.entity.OrderEntity;
import uit.project.finalproject.entity.AccEntity;
import uit.project.finalproject.filter.repository.OrderRepository;
import uit.project.finalproject.filter.repository.AccRepository;
import uit.project.finalproject.service.iOrderservice;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService implements iOrderservice{
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private AccRepository accRepository;
    @Autowired
    private OrderConverter orderConverter;
    @Override
    public OrderDTO save(OrderDTO orderDTO) {
        OrderEntity orderEntity = new OrderEntity();
        if(orderDTO.getId() != null){
            OrderEntity oldOrderEntity = orderRepository.findById(orderDTO.getId()).orElse(null);
            orderEntity = orderConverter.toEntity(orderDTO, oldOrderEntity);
        }
        else{
            orderEntity = orderConverter.toEntity(orderDTO);
        }
        AccEntity accEntity = accRepository.findOneByUsername(orderDTO.getUsername_buy());
        orderEntity.setCustomer(accEntity);
        orderEntity = orderRepository.save(orderEntity);
        return orderConverter.toDTO(orderEntity);
    }
    @Override
    public void delete(long[] ids){
        for (long item: ids){
            orderRepository.deleteById(item);
        }
    }

    @Override
    public List<OrderDTO> findAll(Pageable pageable) {
        List<OrderDTO> results = new ArrayList<>();
        List<OrderEntity> entities = orderRepository.findAll(pageable).getContent();
        for(OrderEntity item: entities){
            OrderDTO orderDTO = orderConverter.toDTO(item);
            results.add(orderDTO);
        }
        return results;
    }

    @Override
    public int totalItem() {
        return (int) orderRepository.count();
    }
}
