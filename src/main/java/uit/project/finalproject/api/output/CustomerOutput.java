package uit.project.finalproject.api.output;

import uit.project.finalproject.dto.CustomerDTO;

import java.util.ArrayList;
import java.util.List;

public class CustomerOutput {
    private int page;
    private int totalpage;
    private List<CustomerDTO> listResults = new ArrayList<>();

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getTotalpage() {
        return totalpage;
    }

    public void setTotalpage(int totalpage) {
        this.totalpage = totalpage;
    }

    public List<CustomerDTO> getListResults() {
        return listResults;
    }

    public void setListResults(List<CustomerDTO> listResults) {
        this.listResults = listResults;
    }
}
