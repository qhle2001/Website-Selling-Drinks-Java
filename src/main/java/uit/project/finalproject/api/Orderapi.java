package uit.project.finalproject.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import uit.project.finalproject.api.output.OrderOutput;
import uit.project.finalproject.dto.OrderDTO;
import uit.project.finalproject.service.iOrderservice;

@RestController
@CrossOrigin
public class Orderapi {
    @Autowired
    private iOrderservice orderservice;
    @GetMapping(value="/orders")
    public OrderOutput showOrder(@RequestParam("page") int page,
                                     @RequestParam("limit") int limit){
        OrderOutput result = new OrderOutput();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);
        result.setListResults(orderservice.findAll(pageable));
        result.setTotalpage((int)Math.ceil((double) (orderservice.totalItem()) / limit));
        return result;
    }
    @PostMapping(value="/orders")
    public OrderDTO createOrder(@RequestBody OrderDTO model){

        return orderservice.save(model);
    }
    @PutMapping(value="/orders/{id}")
    public OrderDTO updateOrder(@RequestBody OrderDTO model, @PathVariable("id") long id){
        model.setId(id);
        return orderservice.save(model);
    }
    @DeleteMapping(value="/orders")
    public void deleteOrder(@RequestBody long[] ids){
        orderservice.delete(ids);
    }
//    @GetMapping(value="/order/{id}")
//    public OrderDTO getOrderById(@PathVariable("id") long id) {
//        return orderservice.findById(id);
//    }
}
