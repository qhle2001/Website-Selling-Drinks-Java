package uit.project.finalproject.service;

import org.springframework.data.domain.Pageable;
import uit.project.finalproject.dto.CommentDTO;

import java.util.List;

public interface iCommentservice {
    CommentDTO save(CommentDTO commentDTO);

    void delete(long[] ids);
    List<CommentDTO> findAll(Pageable pageable);
    List<CommentDTO> findAll();
    int totalItem();
}
