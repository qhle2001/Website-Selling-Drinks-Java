package uit.project.finalproject.entity;

import jakarta.persistence.*;

@Entity

@Table(name = "product")
public class ProductEntity extends BaseEntity{
    @Column(name = "name")
    private String title;
    @Column
    private String thumbnall;
    @Column
    private String shortdescription;
    @Column
    private String content;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private CategoryEntity categr;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getThumbnall() {
        return thumbnall;
    }

    public void setThumbnall(String thumbnall) {
        this.thumbnall = thumbnall;
    }

    public String getShortdescription() {
        return shortdescription;
    }

    public void setShortdescription(String shortdescription) {
        this.shortdescription = shortdescription;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public CategoryEntity getCategr() {
        return categr;
    }

    public void setCategr(CategoryEntity categr) {
        this.categr = categr;
    }
}
