package uit.project.finalproject.filter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uit.project.finalproject.entity.CommentEntity;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {
}
