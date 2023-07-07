package uit.project.finalproject.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import uit.project.finalproject.dto.ProductDTO;
import uit.project.finalproject.entity.ProductEntity;
import uit.project.finalproject.service.iProductservice;
import uit.project.finalproject.api.output.ProductOutput;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import java.util.ArrayList;
import java.util.List;
@RestController
@CrossOrigin
public class productapi {
    @Autowired
    private iProductservice productservice;
//    @GetMapping(value="/product")
//    public ProductOutput showProduct(@RequestParam("page") int page,
//                                     @RequestParam("limit") int limit){
//        ProductOutput result = new ProductOutput();
//        result.setPage(page);
//        Pageable pageable = PageRequest.of(page - 1, limit);
//        result.setListResults(productservice.findAll(pageable));
//        result.setTotalpage((int)Math.ceil((double) (productservice.totalItem()) / limit));
//        return result;
//    }
    @GetMapping(value = "/product")
    public ProductOutput showProduct(
            @RequestParam(value = "page", required = false) Integer page,
            @RequestParam(value = "limit", required = false) Integer limit,
            @RequestParam(value = "category_id", required = false) Long categoryId) {

        ProductOutput result = new ProductOutput();

        if (page != null && limit != null) {
            result.setPage(page);
            Pageable pageable = PageRequest.of(page - 1, limit);

            if (categoryId != null) {
                List<ProductDTO> productsByCategory = productservice.findByCategrId(categoryId, pageable);
                result.setListResults(productsByCategory);
                result.setTotalpage((int) Math.ceil((double) productservice.countByCategrId(categoryId) / limit));
            } else {
                List<ProductDTO> allProducts = productservice.findAll(pageable);
                result.setListResults(allProducts);
                result.setTotalpage((int) Math.ceil((double) productservice.totalItem() / limit));
            }
        } else{
            result .setListResults(productservice.findAll());
        }
        return result;
    }

    @PostMapping("/upload")
    public String uploadImage(@RequestParam("image") MultipartFile file) {
        if (file.isEmpty()) {
            return "File is empty";
        }

        try {
            // Đường dẫn tương đối của thư mục
            String relativePath = "./src/main/resources/static/img";

            // Tạo một thể hiện của thư mục
            File directory = new File(relativePath);

            // Lấy đường dẫn tuyệt đối của thư mục
            String absolutePath = directory.getAbsolutePath();
            // Generate a unique filename
            String filename = file.getOriginalFilename();

            // Construct the target file path
            Path targetPath = Path.of(absolutePath, filename);

            // Save the file to the target path
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            return relativePath + "/" + filename;
        } catch (IOException e) {
            e.printStackTrace();
            return "Error while uploading file";
        }
    }

    @PostMapping(value="/product")
    public ProductDTO createProduct(@RequestBody ProductDTO model){

        return productservice.save(model);
    }
    @PutMapping(value="/product/{id}")
    public ProductDTO updateProduct(@RequestBody ProductDTO model, @PathVariable("id") long id){
        model.setId(id);
        return productservice.save(model);
    }
    @DeleteMapping(value="/product")
    public void deleteProduct(@RequestBody long[] ids){
        productservice.delete(ids);
    }
    @GetMapping(value="/product/{id}")
    public ProductDTO getProductById(@PathVariable("id") long id) {
        return productservice.findById(id);
    }

}
