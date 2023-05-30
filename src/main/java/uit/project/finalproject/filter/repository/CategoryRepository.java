package uit.project.finalproject.filter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uit.project.finalproject.entity.CategoryEntity;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
    CategoryEntity findOneByCode(String code);
}
