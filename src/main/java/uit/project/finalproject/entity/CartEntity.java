package uit.project.finalproject.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "cart")
public class CartEntity extends BaseEntity{
    @Column
    private Long productId;
    @Column
    private Long accId;

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getAccId() {
        return accId;
    }

    public void setAccId(Long accId) {
        this.accId = accId;
    }
}
