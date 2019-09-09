package com.nal.ecommerge.manager.controller;

import com.nal.ecommerge.manager.configuration.ImageStorageConfiguration;
import com.nal.ecommerge.manager.services.AuthenticationService;
import com.nal.ecommerge.manager.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Map;

/**
 * @author duynv
 * @version 1.0
 */
@RestController
@RequestMapping("products")
public class ImageController {
    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    ImageService imageService;

    @PostMapping("/{id}/images")
    public ResponseEntity uploadImage(@RequestParam("image") MultipartFile image,
                                      @PathVariable("id") String productId,
                                      @RequestHeader String token) {
        authenticationService.checkExpiryDateToken(token);

        Map<String, Object> map = imageService.saveImage(image, productId);
        return new ResponseEntity(map, HttpStatus.CREATED);
    }

    @GetMapping("/images/{name:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String name) {
        Resource resource = imageService.getImageByName(name);
        String contentType = "application/octet-stream";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
