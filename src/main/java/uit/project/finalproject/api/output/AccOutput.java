package uit.project.finalproject.api.output;

import uit.project.finalproject.dto.AccDTO;

import java.util.ArrayList;
import java.util.List;

public class AccOutput {
    private int page;
    private int totalpage;
    private List<AccDTO> listResults = new ArrayList<>();

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

    public List<AccDTO> getListResults() {
        return listResults;
    }

    public void setListResults(List<AccDTO> listResults) {
        this.listResults = listResults;
    }
}
