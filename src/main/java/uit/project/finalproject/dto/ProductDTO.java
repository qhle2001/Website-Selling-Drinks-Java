package uit.project.finalproject.dto;

public class ProductDTO extends AbstracDTO<ProductDTO>{
    private String title;
    private String size;
    private String content;
    private String shortdescription;
    private String categoryCode;
    private String thumbnall;
//    private Long categoryId;

//    public Long getCategoryId() {
//        return categoryId;
//    }
//
//    public void setCategoryId(Long categoryId) {
//        this.categoryId = categoryId;
//    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getShortdescription() {
        return shortdescription;
    }

    public void setShortdescription(String shortdescription) {
        this.shortdescription = shortdescription;
    }


    public String getCategoryCode() {
        return categoryCode;
    }

    public void setCategoryCode(String categoryCode) {
        this.categoryCode = categoryCode;
    }

    public String getThumbnall() {
        return thumbnall;
    }

    public void setThumbnall(String thumbnall) {
        this.thumbnall = thumbnall;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }
}
