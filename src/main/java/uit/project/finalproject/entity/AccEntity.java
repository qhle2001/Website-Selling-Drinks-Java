package uit.project.finalproject.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "acc")
public class AccEntity extends BaseEntity{
    @Column
    private String username;
    @Column
    private String password;
    @OneToOne(mappedBy = "account")
    private CustomerEntity customer;
    @OneToMany(
            mappedBy = "account"
    )
    private List<CommentEntity> account = new ArrayList<>();
    @OneToMany(
            mappedBy = "customer"
    )
    private List<OrderEntity> orders = new ArrayList<>();

    public List<OrderEntity> getOrders() {
        return orders;
    }

    public void setOrders(List<OrderEntity> orders) {
        this.orders = orders;
    }

    public List<CommentEntity> getAccount() {
        return account;
    }

    public void setAccount(List<CommentEntity> account) {
        this.account = account;
    }

    public CustomerEntity getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerEntity customer) {
        this.customer = customer;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
