package uit.project.finalproject.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import uit.project.finalproject.dto.ProductDTO;
import uit.project.finalproject.service.iProductservice;

@RestController
@CrossOrigin
public class newapi {
//    @RequestMapping(value="/new", method = RequestMethod.POST)
    @Autowired
    private iProductservice productservice;
    @PostMapping(value="/new")
    public ProductDTO createNew(@RequestBody ProductDTO model){

        return productservice.save(model);
    }
    @PutMapping(value="/new/{id}")
    public ProductDTO updateNew(@RequestBody ProductDTO model, @PathVariable("id") long id){
        model.setId(id);
        return productservice.save(model);
    }
    @DeleteMapping(value="/new")
    public void deleteNew(@RequestBody long[] ids){
    }
}
