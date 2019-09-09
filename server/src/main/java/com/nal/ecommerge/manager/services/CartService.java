package com.nal.ecommerge.manager.services;

import com.nal.ecommerge.manager.exceptions.SQLViolationExceptionHandler;
import com.nal.ecommerge.manager.models.Cart;

import java.util.Map;

public interface CartService {
    Map<String, Object> getCartInfoByUsername(String username);

    Map<String, Object> insert(Cart cart) throws SQLViolationExceptionHandler;

    Map<String, Object> disableProductFromCart(Integer id);
}
