package com.nal.ecommerge.manager.controller;
import com.nal.ecommerge.manager.exceptions.BodyEmptyException;
import com.nal.ecommerge.manager.models.Product;
import com.nal.ecommerge.manager.services.AuthenticationService;
import com.nal.ecommerge.manager.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController
@RequestMapping("products")
public class ProductController {
    @Autowired
    ProductService productService;
    @Autowired
    private AuthenticationService authenticationService;
    /**
     * @author thangth
     * @version 1.0
     */
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductByIdForAdmin(@PathVariable("id") Integer id,
                                                          @RequestHeader String token) {
        authenticationService.checkExpiryDateToken(token);
        Product product = productService.findProductById(id);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }
    /**
     * @author vunv
     * @version 1.0
     */
    @GetMapping()
    public ResponseEntity getAllProductForAdmin(@RequestHeader String token) {
        authenticationService.checkExpiryDateToken(token);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("token", token);
        Map<String, Object> mapResponse = productService.getAllProductForAdmin();
        return new ResponseEntity(mapResponse, responseHeaders, HttpStatus.OK);
    }
    /**
     * @author vunv
     * @version 1.0
     */
    @PutMapping("/{status}/{id}")
    public ResponseEntity setActiveProduct(@RequestHeader String token,
                                           @PathVariable("status") String status,
                                           @PathVariable("id") int id) {
        authenticationService.checkExpiryDateToken(token);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("token", token);
        Map<String, Object> mapResponse = productService.setActiveForProduct(status, id);
        return new ResponseEntity(mapResponse, responseHeaders, HttpStatus.OK);
    }
    @PutMapping("/{id}")
    public ResponseEntity updateProductById(@RequestBody(required = false) Product product,
                                            @PathVariable("id") int id,
                                            @RequestHeader String token) {
        authenticationService.checkExpiryDateToken(token);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("token", token);
        Map<String, Object> mapRespondProduct = productService.updateProductByIdForAdmin(product, id);
        return new ResponseEntity(mapRespondProduct, responseHeaders, HttpStatus.OK);
    }
    /**
     * @author thangth
     * @version 1.0
     */
    @PostMapping()
    public ResponseEntity<Map> insertProductFromAdmin(@RequestBody(required = false) Product product,
                                                      @RequestHeader String token) throws BodyEmptyException {
        authenticationService.checkExpiryDateToken(token);
        Map<String, Object> map = productService.insertProductFromAdmin(product);
        return new ResponseEntity(map, HttpStatus.CREATED);
    }
}