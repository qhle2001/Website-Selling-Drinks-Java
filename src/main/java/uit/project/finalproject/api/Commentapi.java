package uit.project.finalproject.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import uit.project.finalproject.api.output.CommentOutput;
import uit.project.finalproject.dto.CommentDTO;
import uit.project.finalproject.service.iCommentservice;

@RestController
@CrossOrigin
public class Commentapi {
    @Autowired
    private iCommentservice commentservice;
    @GetMapping(value="/comment")
    public CommentOutput showComment(@RequestParam("page") int page,
                                     @RequestParam("limit") int limit){
        CommentOutput result = new CommentOutput();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);
        result.setListResults(commentservice.findAll(pageable));
        result.setTotalpage((int)Math.ceil((double) (commentservice.totalItem()) / limit));
        return result;
    }
    @PostMapping(value="/comment")
    public CommentDTO createComment(@RequestBody CommentDTO model){

        return commentservice.save(model);
    }
    @PutMapping(value="/comment/{id}")
    public CommentDTO updateComment(@RequestBody CommentDTO model, @PathVariable("id") long id){
        model.setId(id);
        return commentservice.save(model);
    }
    @DeleteMapping(value="/comment")
    public void deleteComment(@RequestBody long[] ids){
        commentservice.delete(ids);
    }
}
