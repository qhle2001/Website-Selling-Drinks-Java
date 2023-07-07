package uit.project.finalproject.filter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uit.project.finalproject.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    Page<ProductEntity> findByCategrId(Long categoryId, Pageable pageable);
//    Page<ProductEntity> findByCategoryId(Long categoryId);

    int countByCategrId(long categoryId);
}
