package uit.project.finalproject.dto;

public class CommentDTO extends AbstracDTO<CommentDTO>{
    private String content;
    private String judge;
    private String username;
    private Long acc_id;

    public Long getAcc_id() {
        return acc_id;
    }

    public void setAcc_id(Long acc_id) {
        this.acc_id = acc_id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getJudge() {
        return judge;
    }

    public void setJudge(String judge) {
        this.judge = judge;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
