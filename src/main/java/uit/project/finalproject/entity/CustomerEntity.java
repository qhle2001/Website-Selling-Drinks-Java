package uit.project.finalproject.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "customer")
public class CustomerEntity extends BaseEntity{
    @Column
    private String firstname;
    @Column
    private String lastname;
    @Column
    private Date dayofbirth;
    @Column
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date participantdate;
    @Column
    private String homeaddress;
    @ManyToOne
    @JoinColumn(name = "account_id")
    private AccEntity account;

    public AccEntity getAccount() {
        return account;
    }

    public void setAccount(AccEntity account) {
        this.account = account;
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
}
