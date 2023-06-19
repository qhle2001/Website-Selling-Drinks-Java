package uit.project.finalproject.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class OrderEntity extends BaseEntity{
    @Column
    private String productname;
    @Column
    private String size;
    @Column
    private String quantity;
    @Column
    private String homeaddress;
    @Column
    private String customername;
    @Column
    private String phonenumber;
    @ManyToOne
    @JoinColumn(name = "account_id")
    private AccEntity customer;

    public String getProductname() {
        return productname;
    }

    public void setProductname(String productname) {
        this.productname = productname;
    }

    public AccEntity getCustomer() {
        return customer;
    }

    public void setCustomer(AccEntity customer) {
        this.customer = customer;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getHomeaddress() {
        return homeaddress;
    }

    public void setHomeaddress(String homeaddress) {
        this.homeaddress = homeaddress;
    }

    public String getCustomername() {
        return customername;
    }

    public void setCustomername(String customername) {
        this.customername = customername;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }
}
