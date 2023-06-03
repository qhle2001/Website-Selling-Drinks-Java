package uit.project.finalproject.dto;

public class CommentDTO extends AbstracDTO<CommentDTO>{
    private String content;
    private String username;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
