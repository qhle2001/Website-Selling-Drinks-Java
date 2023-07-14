package uit.project.finalproject.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import uit.project.finalproject.api.output.CartOutput;
import uit.project.finalproject.api.output.ProductOutput;
import uit.project.finalproject.dto.CartDTO;
import uit.project.finalproject.dto.ProductDTO;
import uit.project.finalproject.service.iCartservice;

import java.util.List;

@RestController
@CrossOrigin
public class Cartapi {
    @Autowired
    private iCartservice cartservice;
    @GetMapping(value="/cart")
    public CartOutput showCart(@RequestParam(value = "page", required = false) Integer page,
                               @RequestParam(value = "limit", required = false) Integer limit,
                                @RequestParam(value = "accId", required = false) Long accid){
        CartOutput result = new CartOutput();
        if (page != null && limit !=null){
            result.setPage(page);
            Pageable pageable = PageRequest.of(page - 1, limit);
            if (accid != null) {
                List<CartDTO> productsById = cartservice.findByaccId(accid, pageable);
                result.setListResults(productsById);
                result.setTotalpage((int) Math.ceil((double) cartservice.countByaccId(accid) / limit));
            } else {
                result.setListResults(cartservice.findAll(pageable));
                result.setTotalpage((int)Math.ceil((double) (cartservice.totalItem()) / limit));
            }
        } else {
            if (accid != null) {
                result.setListResults(cartservice.findByAccId(accid));
            } else {
                result.setListResults(cartservice.findAll());
            }
        }
        return result;
    }
    @PostMapping(value="/cart")
    public CartDTO createCart(@RequestBody CartDTO model){

        return cartservice.save(model);
    }
    @PutMapping(value="/cart/{id}")
    public CartDTO updateCart(@RequestBody CartDTO model, @PathVariable("id") long id){
        model.setId(id);
        return cartservice.save(model);
    }
    @DeleteMapping(value="/cart")
    public void deleteCart(@RequestBody long[] ids){
        cartservice.delete(ids);
    }
}
