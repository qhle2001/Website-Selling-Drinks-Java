package uit.project.finalproject.filter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uit.project.finalproject.entity.TypeAccEntity;

public interface TypeAccRepository extends JpaRepository<TypeAccEntity, Long> {
    TypeAccEntity findOneByCode(String code);
}
