package com.nal.ecommerge.manager.repositories;

import com.nal.ecommerge.manager.models.Product;

import java.util.List;
import java.util.Optional;

public interface ProductRepository {

    Optional<Product> findProductById(Integer id);

    List<Product> getAllProductForAdmin();

    Integer updateProductByIdFromAdmin(Product product, int id);

    Product insertProductFromAdmin(Product product);

    Integer setActiveForProduct(String status, Integer id);

    List<Product> getAllProductForUser();

    List<Product> findAllProductByBrandAndPrice(String brand, Double priceFrom, Double priceEnd);

    List<Product> findAllProductByBrand(String brand);

    List<Product> findAllProductByPrice(Double priceFrom, Double priceEnd);

    Double findMaxPrice();

    Product getProductById(Integer id);

    Integer updateProductById(Product product, Integer id);
}
