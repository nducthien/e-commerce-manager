package com.nal.ecommerge.manager.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "file")
public class ImageStorageConfiguration {
    private String folderSaveFile;

    public String getUploadDir() {
        return folderSaveFile;
    }

    public void setUploadDir(String folderSaveFile) {
        this.folderSaveFile = folderSaveFile;
    }
}