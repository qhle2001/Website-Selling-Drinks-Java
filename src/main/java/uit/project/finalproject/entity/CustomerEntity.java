package uit.project.finalproject.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "customer")
public class CustomerEntity extends BaseEntity{
    @Column
    private String username;
    @Column
    private String firstname;
    @Column
    private String lastname;
    @Column
    private Date dayofbirth;
    @Column
    private Date participantdate;
    @Column
    private String picture;
    @Column
    private String homeaddress;
    @OneToOne
    @JoinColumn(name = "account_id")
    private AccEntity account;

    public AccEntity getAccount() {
        return account;
    }

    public void setAccount(AccEntity account) {
        this.account = account;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public Date getDayofbirth() {
        return dayofbirth;
    }

    public void setDayofbirth(Date dayofbirth) {
        this.dayofbirth = dayofbirth;
    }

    public Date getParticipantdate() {
        return participantdate;
    }

    public void setParticipantdate(Date participantdate) {
        this.participantdate = participantdate;
    }

    public String getHomeaddress() {
        return homeaddress;
    }

    public void setHomeaddress(String homeaddress) {
        this.homeaddress = homeaddress;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }
}
