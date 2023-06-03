package uit.project.finalproject.api.output;

import uit.project.finalproject.dto.ProductDTO;

import java.util.ArrayList;
import java.util.List;

public class ProductOutput {
    private int page;
    private int totalpage;
    private List<ProductDTO> listResults = new ArrayList<>();

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

    public List<ProductDTO> getListResults() {
        return listResults;
    }

    public void setListResults(List<ProductDTO> listResults) {
        this.listResults = listResults;
    }
}
