package uit.project.finalproject.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import uit.project.finalproject.dto.ProductDTO;
import uit.project.finalproject.service.iProductservice;
import uit.project.finalproject.api.output.ProductOutput;
import java.util.ArrayList;
import java.util.List;
@RestController
@CrossOrigin
public class productapi {
//    @RequestMapping(value="/new", method = RequestMethod.POST)
    @Autowired
    private iProductservice productservice;
    @GetMapping(value="/product")
    public ProductOutput showProduct(@RequestParam("page") int page,
                                     @RequestParam("limit") int limit){
        ProductOutput result = new ProductOutput();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);
        result.setListResults(productservice.findAll(pageable));
        result.setTotalpage((int)Math.ceil((double) (productservice.totalItem()) / limit));
        return result;
    }
    @PostMapping(value="/product")
    public ProductDTO createProduct(@RequestBody ProductDTO model){

        return productservice.save(model);
    }
    @PutMapping(value="/product/{id}")
    public ProductDTO updateProduct(@RequestBody ProductDTO model, @PathVariable("id") long id){
        model.setId(id);
        return productservice.save(model);
    }
    @DeleteMapping(value="/product")
    public void deleteProduct(@RequestBody long[] ids){
        productservice.delete(ids);
    }
    @GetMapping(value="/product/{id}")
    public ProductDTO getProductById(@PathVariable("id") long id) {
        return productservice.findById(id);
    }

}
