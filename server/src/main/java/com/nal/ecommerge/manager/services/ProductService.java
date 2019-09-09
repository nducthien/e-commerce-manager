package com.nal.ecommerge.manager.services;

import com.nal.ecommerge.manager.exceptions.ResourceNotFoundException;
import com.nal.ecommerge.manager.models.Product;

import java.util.Map;

public interface ProductService {
    Product findProductById(Integer id);

    Map<String, Object> getAllProductForAdmin();

    Map<String, Object> updateProductByIdForAdmin(Product product, int id);

    Map<String, Object> getAllProductForUser();

    Map<String, Object> setActiveForProduct(String status, Integer id);

    Map<String, Object> findAllProductByBrandAndPrice(String brand, Double priceFrom, Double priceEnd);

    Map<String, Object> insertProductFromAdmin(Product product) throws ResourceNotFoundException;

    Map<String, Object> updateProductById(Product product, int id);

    Product getProductById(int id);
}