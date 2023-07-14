package uit.project.finalproject.dto;
import java.util.List;
public class AccDTO extends AbstracDTO<AccDTO>{
    private String username;
    private String password;
    private String picture;
    private String customer_name;
    private List<CustomerDTO> customers;

    public List<CustomerDTO> getCustomers() {
        return customers;
    }

    public String getCustomer_name() {
        return customer_name;
    }

    public void setCustomer_name(String customer_name) {
        this.customer_name = customer_name;
    }

    public void setCustomers(List<CustomerDTO> customers) {
        this.customers = customers;
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
