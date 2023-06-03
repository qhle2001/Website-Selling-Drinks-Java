package uit.project.finalproject.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import uit.project.finalproject.api.output.AccOutput;
import uit.project.finalproject.dto.AccDTO;
import uit.project.finalproject.service.iAccservice;

@RestController
@CrossOrigin
public class Accapi {
    @Autowired
    private iAccservice accservice;
    @GetMapping(value="/acc")
    public AccOutput showAcc(@RequestParam("page") int page,
                                     @RequestParam("limit") int limit){
        AccOutput result = new AccOutput();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);
        result.setListResults(accservice.findAll(pageable));
        result.setTotalpage((int)Math.ceil((double) (accservice.totalItem()) / limit));
        return result;
    }
    @PostMapping(value="/acc")
    public AccDTO createAcc(@RequestBody AccDTO model){

        return accservice.save(model);
    }
    @PutMapping(value="/acc/{id}")
    public AccDTO updateAcc(@RequestBody AccDTO model, @PathVariable("id") long id){
        model.setId(id);
        return accservice.save(model);
    }
    @DeleteMapping(value="/acc")
    public void deleteAcc(@RequestBody long[] ids){
        accservice.delete(ids);
    }
}
