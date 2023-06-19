package uit.project.finalproject.entity;

import jakarta.persistence.*;

@Entity

@Table(name = "product")
public class ProductEntity extends BaseEntity{
    @Column(name = "name")
    private String title;
    @Column
    private String picture;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private CategoryEntity categr;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public CategoryEntity getCategr() {
        return categr;
    }

    public void setCategr(CategoryEntity categr) {
        this.categr = categr;
    }
}
