package com.nal.ecommerge.manager.services.internal;

import com.nal.ecommerge.manager.exceptions.BodyEmptyException;
import com.nal.ecommerge.manager.exceptions.ResourceNotFoundException;
import com.nal.ecommerge.manager.models.Product;
import com.nal.ecommerge.manager.repositories.ProductRepository;
import com.nal.ecommerge.manager.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class ProductServiceImp implements ProductService {
    @Autowired
    ProductRepository productRepository;
    Map<String, Object> mapResponse;

    @Override
    public Product findProductById(Integer id) throws ResourceNotFoundException {
        Optional<Product> productOptional = productRepository.findProductById(id);
        if (!productOptional.isPresent()) {
            throw new ResourceNotFoundException("Product not found!");
        }
        return productOptional.get();
    }

    @Override
    public Map<String, Object> getAllProductForAdmin() {
        List<Product> lstProduct = productRepository.getAllProductForAdmin();
        mapResponse = new LinkedHashMap<>();
        mapResponse.put("status", "200");
        mapResponse.put("items", lstProduct);
        return mapResponse;
    }

    @Override
    public Map<String, Object> updateProductByIdForAdmin(Product product, int id) {
        if (product == null) {
            throw new BodyEmptyException("Please enter information product!");
        }
        int updatedValue = productRepository.updateProductByIdFromAdmin(product, id);
        Map<String, Object> mapResponse = new LinkedHashMap<>();
        if (updatedValue > 0) {
            mapResponse.put("status", "200");
            mapResponse.put("message", "Updated product!");
            return mapResponse;
        } else {
            throw new ResourceNotFoundException("Not Found!");
        }
    }

    public Map<String, Object> setActiveForProduct(String status, Integer id) {
        int result = productRepository.setActiveForProduct(status, id);
        if (result <= 0) {
            throw new ResourceNotFoundException("Not found product !");
        }
        mapResponse = new LinkedHashMap<>();
        mapResponse.put("status", "200");
        mapResponse.put("message", "Changed status success !");
        return mapResponse;
    }

    @Override
    public Map<String, Object> getAllProductForUser() {
        List<Product> lstProduct = productRepository.getAllProductForUser();
        mapResponse = new LinkedHashMap<>();
        mapResponse.put("status", "200");
        mapResponse.put("items", lstProduct);
        return mapResponse;
    }

    @Override
    public Map<String, Object> findAllProductByBrandAndPrice(String brand, Double priceFrom, Double priceEnd) {
        List<Product> listProduct = null;
        if (priceFrom == 0 && priceEnd != 0) {
            priceFrom = 0.00001;
        }
        if (priceFrom != 0 && priceEnd == 0) {
            priceEnd = productRepository.findMaxPrice();
        }
        if (brand.equals("all") && priceFrom == 0 && priceEnd == 0) {
            listProduct = productRepository.getAllProductForUser();
        }
        if (brand.equals("all") && priceFrom != 0 && priceEnd != 0) {
            listProduct = productRepository.findAllProductByPrice(priceFrom, priceEnd);
        }
        if (!brand.equals("all") && priceEnd == 0 && priceFrom == 0) {
            listProduct = productRepository.findAllProductByBrand(brand);
        }
        if (!brand.equals("all") && priceEnd != 0 && priceFrom != 0) {
            listProduct = productRepository.findAllProductByBrandAndPrice(brand, priceFrom, priceEnd);
        }
        mapResponse = new LinkedHashMap<>();
        mapResponse.put("status", "200");
        mapResponse.put("items", listProduct);
        return mapResponse;
    }

    @Override
    public Map<String, Object> insertProductFromAdmin(Product product) {
        if (product == null) {
            throw new BodyEmptyException("please enter information product!");
        }
        String currentTime = getCurrentTime();
        product.setDateCreated(currentTime);
        product.setActive("enable");
        Product newProduct = productRepository.insertProductFromAdmin(product);
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("status", "201");
        map.put("message", "Created product!");
        map.put("items", newProduct);
        return map;
    }

    public String getCurrentTime() {
        Calendar calendar = Calendar.getInstance();
        Date currentTime = calendar.getTime();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-M-yyyy kk:mm:ss");
        String dateTimeFormatted = simpleDateFormat.format(currentTime);
        return dateTimeFormatted;
    }

    public Map<String, Object> updateProductById(Product product, int id) {
        Product productOld = getProductById(id);
        mapResponse = new LinkedHashMap<>();
        if (productOld == null) {
            throw new ResourceNotFoundException("Not Found!");
        }
        if (product == null) {
            mapResponse.put("status", "200");
            mapResponse.put("message", "updated product information");
            return mapResponse;
        }
        fillToNewProduct(product, productOld);
        int result = productRepository.updateProductById(product, id);
        if (result > 0) {
            mapResponse.put("status", "200");
            mapResponse.put("message", "updated product information");
            return mapResponse;
        } else {
            throw new ResourceNotFoundException("Not Found!");
        }
    }

    private void fillToNewProduct(Product product, Product productOld) {
        if (product.getName() == null || product.getName().trim().length() == 0) {
            product.setName(productOld.getName());
        }
        if (product.getPrice() == 0) {
            product.setPrice(productOld.getPrice());
        }
        if (product.getImage() == null || product.getImage().trim().length() == 0) {
            product.setImage(productOld.getImage());
        }
        if (product.getCpu() == null || product.getCpu().trim().length() == 0) {
            product.setCpu(productOld.getCpu());
        }
        if (product.getScreen() == null || product.getScreen().trim().length() == 0) {
            product.setScreen(productOld.getScreen());
        }
        if (product.getPin() == null || product.getPin().trim().length() == 0) {
            product.setPin(productOld.getPin());
        }
        if (product.getMemory() == null || product.getMemory().trim().length() == 0) {
            product.setMemory(productOld.getMemory());
        }
        if (product.getDateCreated() == null || product.getDateCreated().trim().length() == 0) {
            product.setDateCreated(null);
        }
        if (product.getDescribe() == null || product.getDescribe().trim().length() == 0) {
            product.setDescribe(productOld.getDescribe());
        }
        if (product.getActive() == null || product.getActive().trim().length() == 0) {
            product.setActive(productOld.getActive());
        }
        if (product.getBrand() == null || product.getBrand().trim().length() == 0) {
            product.setBrand(productOld.getBrand());
        }
    }

    @Override
    public Product getProductById(int id) {
        Product product = productRepository.getProductById(id);
        return product;
    }
}