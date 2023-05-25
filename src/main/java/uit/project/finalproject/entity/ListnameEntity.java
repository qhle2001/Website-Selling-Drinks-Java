package uit.project.finalproject.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "listname")
public class ListnameEntity extends BaseEntity{
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
    private String homeaddress;
    @OneToMany(
            mappedBy = "listnames"
    )
    private List<AccEntity> account = new ArrayList<>();

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

    public List<AccEntity> getAccount() {
        return account;
    }

    public void setAccount(List<AccEntity> account) {
        this.account = account;
    }
}
