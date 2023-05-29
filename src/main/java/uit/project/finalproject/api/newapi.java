package uit.project.finalproject.api;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import uit.project.finalproject.dto.NewDTO;
@Controller
public class newapi {
    @RequestMapping(value="/new", method = RequestMethod.POST)
    @ResponseBody
    public NewDTO createNew(@RequestBody NewDTO model){
        return model;
    }
}
