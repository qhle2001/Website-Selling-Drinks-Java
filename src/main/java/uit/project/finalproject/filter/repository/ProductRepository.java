package uit.project.finalproject.filter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uit.project.finalproject.entity.ProductEntity;
import java.util.List;
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
//    List<ProductEntity> findByCategoryId(Long categoryId);

}
