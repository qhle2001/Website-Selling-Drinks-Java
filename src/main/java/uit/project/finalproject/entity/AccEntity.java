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
    @Column
    private String picture;
    @Column
    private String customer_name;

    public String getCustomer_name() {
        return customer_name;
    }

    public void setCustomer_name(String customer_name) {
        this.customer_name = customer_name;
    }

    @OneToMany(
            mappedBy = "account"
    )
    private List<CustomerEntity> customer = new ArrayList<>();
    @OneToMany(
            mappedBy = "account"
    )
    private List<CommentEntity> account = new ArrayList<>();
    @OneToMany(
            mappedBy = "customer"
    )
    private List<OrderEntity> orders = new ArrayList<>();

    public List<CustomerEntity> getCustomer() {
        return customer;
    }

    public void setCustomer(List<CustomerEntity> customer) {
        this.customer = customer;
    }

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

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }


}
