package uit.project.finalproject.dto;

public class CartDTO extends AbstracDTO<CartDTO>{
    private Long accId;
    private Long productId;

    public Long getAccId() {
        return accId;
    }

    public void setAccId(Long accId) {
        this.accId = accId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
}
