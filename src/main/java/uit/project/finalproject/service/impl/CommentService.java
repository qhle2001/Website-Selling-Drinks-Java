package uit.project.finalproject.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import uit.project.finalproject.converter.CommentConverter;
import uit.project.finalproject.dto.CommentDTO;
import uit.project.finalproject.entity.AccEntity;
import uit.project.finalproject.entity.CommentEntity;
import uit.project.finalproject.filter.repository.AccRepository;
import uit.project.finalproject.filter.repository.CommentRepository;
import uit.project.finalproject.service.iCommentservice;

import java.util.ArrayList;
import java.util.List;
@Service
public class CommentService implements iCommentservice {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private AccRepository accRepository;
    @Autowired
    private CommentConverter commentConverter;
    @Override
    public CommentDTO save(CommentDTO commentDTO) {
        CommentEntity commentEntity = new CommentEntity();
        if(commentDTO.getId() != null){
            CommentEntity oldCommentEntity = commentRepository.findById(commentDTO.getId()).orElse(null);
            commentEntity = commentConverter.toEntity(commentDTO, oldCommentEntity);
        }
        else{
            commentEntity = commentConverter.toEntity(commentDTO);
        }
        AccEntity accEntity = accRepository.findOneByUsername(commentDTO.getUsername());
        commentEntity.setAccount(accEntity);
        commentEntity = commentRepository.save(commentEntity);
        return commentConverter.toDTO(commentEntity);
    }
    @Override
    public void delete(long[] ids){
        for (long item: ids){
            commentRepository.deleteById(item);
        }
    }

    @Override
    public List<CommentDTO> findAll(Pageable pageable) {
        List<CommentDTO> results = new ArrayList<>();
        List<CommentEntity> entities = commentRepository.findAll(pageable).getContent();
        for(CommentEntity item: entities){
            CommentDTO commentDTO = commentConverter.toDTO(item);
            results.add(commentDTO);
        }
        return results;
    }

    @Override
    public int totalItem() {
        return (int) commentRepository.count();
    }

    @Override
    public List<CommentDTO> findAll() {
        List<CommentDTO> results = new ArrayList<>();
        List<CommentEntity> entities = commentRepository.findAll();
        for(CommentEntity item: entities){
            CommentDTO commentDTO = commentConverter.toDTO(item);
            results.add(commentDTO);
        }
        return results;
    }
}
