package uit.project.finalproject.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="typeacc")
public class TypeAccEntity extends BaseEntity{
    @Column
    private String code;
    @Column
    private String name;
    @OneToMany(
            mappedBy = "customer_account"
    )
    private List<AccEntity> accounts = new ArrayList<>();

    public List<AccEntity> getAccounts() {
        return accounts;
    }

    public void setAccountAs(List<AccEntity> accounts) {
        this.accounts = accounts;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
