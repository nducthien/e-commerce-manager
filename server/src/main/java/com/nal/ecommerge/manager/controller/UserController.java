package com.nal.ecommerge.manager.controller;

import com.nal.ecommerge.manager.exceptions.BodyEmptyException;
import com.nal.ecommerge.manager.models.Product;
import com.nal.ecommerge.manager.services.AuthenticationService;
import com.nal.ecommerge.manager.services.ProductService;
import com.nal.ecommerge.manager.services.UserService;
import com.nal.ecommerge.manager.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * @author duynv, vunv, thangth, hungpn
 * @version 1.0
 */
@RestController
@RequestMapping("users")
public class UserController {
  @Autowired
  private UserService userService;
  @Autowired
  private ProductService productService;
  @Autowired
  private AuthenticationService authenticationService;

  /**
   * @author vunv
   * @version 1.0
   */
  @GetMapping("/products/field")
  public ResponseEntity findAllProductByBrandAndPrice(@RequestParam(value = "brand", required = false) String brand,
                                                      @RequestParam(value = "priceFrom", required = false) Double priceFrom,
                                                      @RequestParam(value = "priceEnd", required = false) Double priceEnd) {
    Map<String, Object> mapResponse = productService.findAllProductByBrandAndPrice(brand, priceFrom, priceEnd);
    return new ResponseEntity(mapResponse, HttpStatus.OK);
  }

  @GetMapping("/products/{id}")
  public ResponseEntity<Product> getProductByIdForUser(@PathVariable("id") Integer id) {
    Product product = productService.findProductById(id);
    return new ResponseEntity<>(product, HttpStatus.OK);
  }

  /**
   * @author vunv
   * @version 1.0
   */
  @GetMapping("/products")
  public ResponseEntity getAllProductForUser() {
    Map<String, Object> mapResponse = productService.getAllProductForUser();
    return new ResponseEntity(mapResponse, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<User> getUserById(@PathVariable("id") int id,
                                          @RequestHeader String token) {
    authenticationService.checkExpiryDateToken(token);
    User User = userService.findUserById(id);
    return new ResponseEntity<>(User, HttpStatus.OK);
  }

  @GetMapping()
  public ResponseEntity getAllUser(@RequestHeader String token) {
    authenticationService.checkExpiryDateToken(token);
    HttpHeaders responseHeaders = new HttpHeaders();
    responseHeaders.set("token", token);
    Map<String, Object> mapRespondUser = userService.getUsers();
    return new ResponseEntity(mapRespondUser, responseHeaders, HttpStatus.OK);
  }

  @PostMapping(path = "/register", produces = {"application/json", "application/xml"},
          consumes = {"application/json"})
  public ResponseEntity<Map> registerUser(@RequestBody User user) {
    Map<String, Object> map = userService.registerUser(user);
    return new ResponseEntity(map, HttpStatus.CREATED);
  }

  @PostMapping(produces = {"application/json", "application/xml"},
          consumes = {"application/json"})
  public ResponseEntity<Map> insertUser(@RequestBody(required = false) User user,
                                        @RequestHeader String token) throws BodyEmptyException {
    authenticationService.checkExpiryDateToken(token);
    Map<String, Object> map = userService.insertUserFromAdmin(user);
    return new ResponseEntity(map, HttpStatus.CREATED);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity deleteUserById(@PathVariable("id") int id, @RequestHeader String token) {
    authenticationService.checkExpiryDateToken(token);
    Map<String, Object> mapRespondUser = userService.deleteUserById(id);
    return new ResponseEntity(mapRespondUser, HttpStatus.OK);
  }

  @PutMapping("/{id}")
  public ResponseEntity updateUserById(@RequestBody(required = false) User user,
                                       @PathVariable("id") int id,
                                       @RequestHeader String token) {
    authenticationService.checkExpiryDateToken(token);
    HttpHeaders responseHeaders = new HttpHeaders();
    responseHeaders.set("token", token);
    Map<String, Object> mapRespondUser = userService.updateUserByIdForAdmin(user, id);
    return new ResponseEntity(mapRespondUser, responseHeaders, HttpStatus.OK);
  }
}