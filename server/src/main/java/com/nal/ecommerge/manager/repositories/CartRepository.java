package com.nal.ecommerge.manager.repositories;

import com.nal.ecommerge.manager.models.Cart;

import java.util.List;

public interface CartRepository {
    List<Cart> getCartInfoByUserId(String username);

    Cart getByUserNameAndProductId(String username, int ProductId);

    Cart insert(Cart cart);

    int updateQuantity(Cart cart);

    Integer disableProductFromCart(Integer id);
}
