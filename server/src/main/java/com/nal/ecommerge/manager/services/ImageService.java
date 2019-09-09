package com.nal.ecommerge.manager.services;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface ImageService {
    Resource getImageByName(String imageName);

    Map<String, Object> saveImage(MultipartFile image, String productId);

}
