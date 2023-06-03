package uit.project.finalproject.entity;

import jakarta.persistence.*;

@Entity
@Table(name="comment")
public class CommentEntity extends BaseEntity{
    @Column
    private String content;
    @Column
    private String judge;
    @ManyToOne
    @JoinColumn(name = "acc_id")
    private AccEntity account;

    public AccEntity getAccount() {
        return account;
    }

    public void setAccount(AccEntity account) {
        this.account = account;
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
}
