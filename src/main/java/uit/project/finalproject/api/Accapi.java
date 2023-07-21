package uit.project.finalproject.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import uit.project.finalproject.api.output.AccOutput;
import uit.project.finalproject.dto.AccDTO;
import uit.project.finalproject.service.iAccservice;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

@RestController
@CrossOrigin
public class Accapi {
    @Autowired
    private iAccservice accservice;
    @GetMapping(value="/acc")
    public AccOutput showAcc(@RequestParam(value = "page", required = false) Integer page,
                             @RequestParam(value = "limit", required = false) Integer limit){
        AccOutput result = new AccOutput();
        if (page != null && limit != null){
            result.setPage(page);
            Pageable pageable = PageRequest.of(page - 1, limit);
            result.setListResults(accservice.findAll(pageable));
            result.setTotalpage((int)Math.ceil((double) (accservice.totalItem()) / limit));
        } else {
            result .setListResults(accservice.findAll());
        }
        return result;
    }
//    @PostMapping("/upload")
//    public String uploadImage(@RequestParam("image") MultipartFile file) {
//        if (file.isEmpty()) {
//            return "File is empty";
//        }
//
//        try {
//            // Đường dẫn tương đối của thư mục
//            String relativePath = "./src/main/resources/static/img";
//
//            // Tạo một thể hiện của thư mục
//            File directory = new File(relativePath);
//
//            // Lấy đường dẫn tuyệt đối của thư mục
//            String absolutePath = directory.getAbsolutePath();
//            // Generate a unique filename
//            String filename = file.getOriginalFilename();
//
//            // Construct the target file path
//            Path targetPath = Path.of(absolutePath, filename);
//
//            // Save the file to the target path
//            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
//
//            return relativePath + "/" + filename;
//        } catch (IOException e) {
//            e.printStackTrace();
//            return "Error while uploading file";
//        }
//    }
    @PostMapping(value="/acc")
    public AccDTO createAcc(@RequestBody AccDTO model){

        return accservice.save(model);
    }
    @PutMapping(value="/acc/{id}")
    public AccDTO updateAcc(@RequestBody AccDTO model, @PathVariable("id") long id){
        model.setId(id);
        return accservice.save(model);
    }
    @DeleteMapping(value="/acc")
    public void deleteAcc(@RequestBody long[] ids){
        accservice.delete(ids);
    }
    @GetMapping(value="/acc/{username}")
    public AccDTO getAccByUsername(@PathVariable("username") String username) {
        return accservice.getAccByUsername(username);
    }
}
