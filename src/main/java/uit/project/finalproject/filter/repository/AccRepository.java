package uit.project.finalproject.filter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uit.project.finalproject.entity.AccEntity;

public interface AccRepository extends JpaRepository<AccEntity, Long> {
    AccEntity findOneByUsername(String username);
}
