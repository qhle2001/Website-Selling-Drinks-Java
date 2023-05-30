package uit.project.finalproject.dto;

public class ProductDTO extends AbstracDTO<ProductDTO>{
    private String title;
    private String content;
    private String shortdescription;
    private String categoryid;
    private String thumbnall;

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

    public String getCategoryid() {
        return categoryid;
    }

    public void setCategoryid(String categoryid) {
        this.categoryid = categoryid;
    }

    public String getThumbnall() {
        return thumbnall;
    }

    public void setThumbnall(String thumbnall) {
        this.thumbnall = thumbnall;
    }
}
