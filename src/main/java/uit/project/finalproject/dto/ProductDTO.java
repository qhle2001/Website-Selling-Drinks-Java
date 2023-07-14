package uit.project.finalproject.dto;

import java.util.List;

public class ProductDTO extends AbstracDTO<ProductDTO>{
    private String title;
    private String categoryCode;
    private String picture;
    private CategoryDTO category;
    private Long category_id;
    private String smallsize;
    private String medium;
    private String large;

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

    public Long getCategory_id() {
        return category_id;
    }

    public void setCategory_id(Long category_id) {
        this.category_id = category_id;
    }

    public CategoryDTO getCategory() {
        return category;
    }

    public void setCategory(CategoryDTO category) {
        this.category = category;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public String getCategoryCode() {
        return categoryCode;
    }

    public void setCategoryCode(String categoryCode) {
        this.categoryCode = categoryCode;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }
}
