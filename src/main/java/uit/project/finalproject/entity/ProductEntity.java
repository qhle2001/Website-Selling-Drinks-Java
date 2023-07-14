package uit.project.finalproject.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity

@Table(name = "product")
public class ProductEntity extends BaseEntity{
    @Column(name = "name")
    private String title;
    @Column
    private String picture;
    @Column
    private String smallsize;
    @Column
    private String medium;
    @Column
    private String large;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private CategoryEntity categr;

    public String getSmallsize() {
        return smallsize;
    }

    public void setSmallsize(String smallsize) {
        this.smallsize = smallsize;
    }

    public String getMedium() {
        return medium;
    }

    public void setMedium(String medium) {
        this.medium = medium;
    }

    public String getLarge() {
        return large;
    }

    public void setLarge(String large) {
        this.large = large;
    }

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
