package uit.project.finalproject.Controler;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
public class HomeControler {
    @RequestMapping("/home")
    public String index(){
        return "index";
    }
}
