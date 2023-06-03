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
    @ManyToOne
    @JoinColumn(name = "typeacc_id")
    private TypeAccEntity customer_account;
    @OneToMany(
            mappedBy = "account"
    )
    private List<CommentEntity> account = new ArrayList<>();

    public List<CommentEntity> getAccount() {
        return account;
    }

    public void setAccount(List<CommentEntity> account) {
        this.account = account;
    }

    public TypeAccEntity getCustomer_account() {
        return customer_account;
    }

    public void setCustomer_account(TypeAccEntity customer_account) {
        this.customer_account = customer_account;
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
