package com.nal.ecommerge.manager.services.internal;

import com.nal.ecommerge.manager.configuration.ImageStorageConfiguration;
import com.nal.ecommerge.manager.exceptions.CanNotSaveFileException;
import com.nal.ecommerge.manager.exceptions.FileStorageException;
import com.nal.ecommerge.manager.exceptions.NoImageHasBeenChooseException;
import com.nal.ecommerge.manager.exceptions.ResourceNotFoundException;
import com.nal.ecommerge.manager.repositories.ImageRepository;
import com.nal.ecommerge.manager.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class ImageServiceImp implements ImageService {
    @Autowired
    private ImageRepository imageRepository;

    private final Path imageStorageLocation;

    @Autowired
    public ImageServiceImp(ImageStorageConfiguration imageStorageConfiguration) {
        this.imageStorageLocation = Paths.get(imageStorageConfiguration.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.imageStorageLocation);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @Override
    public Map<String, Object> saveImage(MultipartFile image, String productId)
            throws CanNotSaveFileException {
        if (image.isEmpty()) {
            throw new NoImageHasBeenChooseException("please choose a image to upload");
        }

        String imageName = StringUtils.cleanPath(image.getOriginalFilename());

        if (imageName.contains("..")) {
            throw new FileStorageException("Sorry! Filename contains invalid path sequence " + imageName);
        }

        Path folderSaveImageLocation = this.imageStorageLocation.resolve(imageName);
        saveImageToFolder(image, folderSaveImageLocation);

        saveImageNameToDatabaseByProductId(imageName, productId);

        Map<String, Object> map = new LinkedHashMap<>();
        map.put("status", "201");
        map.put("message", "Uploaded!");
        map.put("imageName", imageName);

        return map;
    }

    public void saveImageToFolder(MultipartFile image, Path folderSaveImageLocation) throws CanNotSaveFileException {
        try {
            Files.copy(image.getInputStream(), folderSaveImageLocation, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new CanNotSaveFileException("error save file to directory");
        }

    }

    public void saveImageNameToDatabaseByProductId(String imageName, String productId) {
        imageRepository.saveImageNameByProductId(imageName, productId);
    }

    public Resource getImageByName(String imageName) {
        Resource resource;
        try {
            Path folderSaveImageLocation = this.imageStorageLocation.resolve(imageName).normalize();
            resource = new UrlResource(folderSaveImageLocation.toUri());

            if (!resource.exists()) {
                throw new ResourceNotFoundException("image not found " + imageName);
            }

        } catch (MalformedURLException ex) {
            throw new ResourceNotFoundException("image not found in resource" + imageName);
        }

        return resource;
    }

    public void saveImageToDirectory(MultipartFile image) throws CanNotSaveFileException {
        try {
            String folderSaveImage = "/home/duy/Desktop/e-commerce-manager-front-end-week-8/e-commerce-project/static/images/";

            String folderSaveImageRelative = "../../../../../Desktop/e-commerce-manager-front-end-week-8/e-commerce-project/public/images/";
            byte[] bytes = image.getBytes();
            Path path = Paths.get(folderSaveImageRelative + image.getOriginalFilename());
            Files.write(path, bytes);
        } catch (IOException e) {
            throw new CanNotSaveFileException("error save file to directory");
        }
    }
}
