package uit.project.finalproject.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import uit.project.finalproject.api.output.CustomerOutput;
import uit.project.finalproject.dto.CustomerDTO;
import uit.project.finalproject.service.iCustomerservice;

@RestController
@CrossOrigin
public class Customerapi {
    @Autowired
    private iCustomerservice customerservice;
    @GetMapping(value="/customer")
    public CustomerOutput showCustomer(@RequestParam(value = "page", required = false) Integer page,
                                     @RequestParam(value = "limit", required = false) Integer limit){
        CustomerOutput result = new CustomerOutput();
        if (page != null && limit != null) {
            result.setPage(page);
            Pageable pageable = PageRequest.of(page - 1, limit);
            result.setListResults(customerservice.findAll(pageable));
            result.setTotalpage((int) Math.ceil((double) (customerservice.totalItem()) / limit));
        } else {
            result .setListResults(customerservice.findAll());
        }
        return result;
    }
    @PostMapping(value="/customer")
    public CustomerDTO createCustomer(@RequestBody CustomerDTO model){

        return customerservice.save(model);
    }
    @PutMapping(value="/customer/{id}")
    public CustomerDTO updateCustomer(@RequestBody CustomerDTO model, @PathVariable("id") long id){
        model.setId(id);
        return customerservice.save(model);
    }
    @DeleteMapping(value="/customer")
    public void deleteCustomer(@RequestBody long[] ids){
        customerservice.delete(ids);
    }
}
