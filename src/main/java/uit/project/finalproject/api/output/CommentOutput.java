package uit.project.finalproject.api.output;

import uit.project.finalproject.dto.CommentDTO;

import java.util.ArrayList;
import java.util.List;

public class CommentOutput {
    private int page;
    private int totalpage;
    private List<CommentDTO> listResults = new ArrayList<>();

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

    public List<CommentDTO> getListResults() {
        return listResults;
    }

    public void setListResults(List<CommentDTO> listResults) {
        this.listResults = listResults;
    }
}
