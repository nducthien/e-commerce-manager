package com.nal.ecommerge.manager.repositories;

public interface ImageRepository {

    String getImageName();

    Integer saveImageNameByProductId(String imageName, String productId);

    String deleteImageName();
}
