package uit.project.finalproject.filter.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import uit.project.finalproject.entity.CartEntity;
import uit.project.finalproject.entity.ProductEntity;

import java.util.List;

public interface CartRepository extends JpaRepository<CartEntity, Long> {
    Page<CartEntity> findByaccId(Long accid, Pageable pageable);
//    Page<ProductEntity> findByCategoryId(Long categoryId);

    int countByaccId(long accid);

    List<CartEntity> findByAccId(Long accId);
}
