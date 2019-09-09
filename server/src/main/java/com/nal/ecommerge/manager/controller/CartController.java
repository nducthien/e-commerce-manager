package com.nal.ecommerge.manager.controller;

import com.nal.ecommerge.manager.models.Cart;
import com.nal.ecommerge.manager.services.AuthenticationService;
import com.nal.ecommerge.manager.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("carts")
public class CartController {
    private static int id = 0;
    @Autowired
    CartService cartService;
    @Autowired
    AuthenticationService authenticationService;

    @GetMapping("/{username}")
    public ResponseEntity getAllProductForUser(@PathVariable("username") String username,
                                               @RequestHeader String token) {
        authenticationService.checkExpiryDateToken(token);
        Map<String, Object> mapResponse = cartService.getCartInfoByUsername(username);
        return new ResponseEntity(mapResponse, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Map> insert(@RequestBody Cart cart,
                                      @RequestHeader String token) {
        authenticationService.checkExpiryDateToken(token);
        Map<String, Object> map = this.cartService.insert(cart);
        return new ResponseEntity(map, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map> disableProductFromCart(@PathVariable Integer id,
                                                      @RequestHeader String token) {
        authenticationService.checkExpiryDateToken(token);
        Map<String, Object> map = this.cartService.disableProductFromCart(id);
        return new ResponseEntity(map, HttpStatus.OK);
    }
}
