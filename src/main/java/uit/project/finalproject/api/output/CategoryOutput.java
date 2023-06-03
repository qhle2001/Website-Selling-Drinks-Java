package uit.project.finalproject.api.output;

import uit.project.finalproject.dto.CategoryDTO;

import java.util.ArrayList;
import java.util.List;

public class CategoryOutput {
    private int page;
    private int totalpage;
    private List<CategoryDTO> listResults = new ArrayList<>();

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

    public List<CategoryDTO> getListResults() {
        return listResults;
    }

    public void setListResults(List<CategoryDTO> listResults) {
        this.listResults = listResults;
    }
}
