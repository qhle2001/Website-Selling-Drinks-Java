package uit.project.finalproject.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "acc")
public class AccEntity extends BaseEntity{
    @Column
    private String username;
    @Column
    private String password;
    @Column
    private String typeacc;
    @ManyToOne
    @JoinColumn(name = "listname_id")
    private ListnameEntity listnames;

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

    public String getTypeacc() {
        return typeacc;
    }

    public void setTypeacc(String typeacc) {
        this.typeacc = typeacc;
    }

    public ListnameEntity getListnames() {
        return listnames;
    }

    public void setListnames(ListnameEntity listnames) {
        this.listnames = listnames;
    }
}
