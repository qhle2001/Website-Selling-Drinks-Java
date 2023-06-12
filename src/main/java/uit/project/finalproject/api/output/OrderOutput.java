package uit.project.finalproject.api.output;

import uit.project.finalproject.dto.OrderDTO;

import java.util.ArrayList;
import java.util.List;

public class OrderOutput {
    private int page;
    private int totalpage;
    private List<OrderDTO> listResults = new ArrayList<>();

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

    public List<OrderDTO> getListResults() {
        return listResults;
    }

    public void setListResults(List<OrderDTO> listResults) {
        this.listResults = listResults;
    }
}
