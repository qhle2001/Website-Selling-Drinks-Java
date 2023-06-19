package uit.project.finalproject.converter;

import org.springframework.stereotype.Component;
import uit.project.finalproject.dto.CommentDTO;
import uit.project.finalproject.entity.AccEntity;
import uit.project.finalproject.entity.CommentEntity;
@Component
public class CommentConverter {
    public CommentEntity toEntity(CommentDTO dto){
        CommentEntity entity = new CommentEntity();
        entity.setContent(dto.getContent());
        entity.setJudge(dto.getJudge());

        if (dto.getAcc_id() != null) {
            AccEntity accEntity = new AccEntity();
            accEntity.setId(dto.getAcc_id());
            entity.setAccount(accEntity);
        }

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

        AccEntity categoryEntity = entity.getAccount();
        if (categoryEntity != null) {
            dto.setAcc_id(categoryEntity.getId());
            // Thực hiện việc lấy categoryCode từ categoryEntity và gán cho dto
            dto.setUsername(categoryEntity.getUsername());
        }

//        dto.setUsername(entity.getAccount().getUsername());
        return dto;
    }

    public CommentEntity toEntity(CommentDTO dto, CommentEntity entity){
        entity.setContent(dto.getContent());
        entity.setJudge(dto.getJudge());

        if (dto.getAcc_id() != null) {
            AccEntity accEntity = new AccEntity();
            accEntity.setId(dto.getAcc_id());
            entity.setAccount(accEntity);
        }

        return entity;
    }
}
