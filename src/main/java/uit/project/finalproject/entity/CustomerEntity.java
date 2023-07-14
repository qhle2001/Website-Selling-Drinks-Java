package uit.project.finalproject.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "customer")
public class CustomerEntity extends BaseEntity{
    @Column
    private String fullname;
    @Column
    private String email;
    @Column
    private String phonenumber;
    @Column
    private String homeaddress;
    @ManyToOne
    @JoinColumn(name = "account_id")
    private AccEntity account;

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public AccEntity getAccount() {
        return account;
    }

    public void setAccount(AccEntity account) {
        this.account = account;
    }

    public String getHomeaddress() {
        return homeaddress;
    }

    public void setHomeaddress(String homeaddress) {
        this.homeaddress = homeaddress;
    }
}
