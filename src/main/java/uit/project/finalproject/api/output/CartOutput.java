package uit.project.finalproject.api.output;

import uit.project.finalproject.dto.CartDTO;

import java.util.ArrayList;
import java.util.List;

public class CartOutput {
    private int page;
    private int totalpage;
    private List<CartDTO> listResults = new ArrayList<>();

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

    public List<CartDTO> getListResults() {
        return listResults;
    }

    public void setListResults(List<CartDTO> listResults) {
        this.listResults = listResults;
    }
}
