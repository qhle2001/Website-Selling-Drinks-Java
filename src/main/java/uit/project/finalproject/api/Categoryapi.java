package uit.project.finalproject.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import uit.project.finalproject.api.output.CategoryOutput;
import uit.project.finalproject.dto.CategoryDTO;
import uit.project.finalproject.service.iCategoryservice;

@RestController
@CrossOrigin
public class Categoryapi {
    @Autowired
    private iCategoryservice categoryservice;
    @GetMapping("/category")
    public CategoryOutput showCategory(@RequestParam("page") int page,
                                     @RequestParam("limit") int limit){
        CategoryOutput result = new CategoryOutput();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);
        result.setListResults(categoryservice.findAll(pageable));
        result.setTotalpage((int)Math.ceil((double) (categoryservice.totalItem()) / limit));
        return result;
    }
    @PostMapping("/category")
    public CategoryDTO createCategory(@RequestBody CategoryDTO model){

        return categoryservice.save(model);
    }
    @PutMapping(value="/category/{id}")
    public CategoryDTO updateCategory(@RequestBody CategoryDTO model, @PathVariable("id") long id){
        model.setId(id);
        return categoryservice.save(model);
    }
    @DeleteMapping("/category")
    public void deleteCategory(@RequestBody long[] ids){
        categoryservice.delete(ids);
    }
}
