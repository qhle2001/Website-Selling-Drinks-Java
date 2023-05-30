package uit.project.finalproject.filter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uit.project.finalproject.entity.ProductEntity;

public interface ProductRepopsitory extends JpaRepository<ProductEntity, Long> {
    static ProductEntity findOne(Long id) {
        return null;
    }
}
