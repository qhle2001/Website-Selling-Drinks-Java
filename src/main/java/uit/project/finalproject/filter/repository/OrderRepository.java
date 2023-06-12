package uit.project.finalproject.filter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uit.project.finalproject.entity.OrderEntity;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
}
