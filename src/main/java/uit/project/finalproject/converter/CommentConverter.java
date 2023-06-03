package uit.project.finalproject.converter;

import org.springframework.stereotype.Component;
import uit.project.finalproject.dto.CommentDTO;
import uit.project.finalproject.entity.CommentEntity;
@Component
public class CommentConverter {
    public CommentEntity toEntity(CommentDTO dto){
        CommentEntity entity = new CommentEntity();
        entity.setContent(dto.getContent());
        entity.setJudge(dto.getJudge());
        return entity;
    }

    public CommentDTO toDTO(CommentEntity entity){
        CommentDTO dto = new CommentDTO();
        if(entity.getId() != null){
            dto.setId(entity.getId());
        }
        dto.setContent(entity.getContent());
        dto.setJudge(entity.getJudge());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setModifiedDate(entity.getModifiedDate());
        dto.setCreatedBy(entity.getCreatedBy());
        return dto;
    }

    public CommentEntity toEntity(CommentDTO dto, CommentEntity entity){
        entity.setContent(dto.getContent());
        entity.setJudge(dto.getJudge());
        return entity;
    }
}
