package uit.project.finalproject.filter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uit.project.finalproject.entity.ProductEntity;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
//    ProductEntity findById(Long id);
}
