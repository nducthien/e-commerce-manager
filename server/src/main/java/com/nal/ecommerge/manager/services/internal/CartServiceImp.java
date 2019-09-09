package com.nal.ecommerge.manager.services.internal;

import com.nal.ecommerge.manager.exceptions.BodyEmptyException;
import com.nal.ecommerge.manager.exceptions.SQLViolationExceptionHandler;
import com.nal.ecommerge.manager.models.Cart;
import com.nal.ecommerge.manager.models.Product;
import com.nal.ecommerge.manager.models.RowCartInformation;
import com.nal.ecommerge.manager.repositories.CartRepository;
import com.nal.ecommerge.manager.repositories.ProductRepository;
import com.nal.ecommerge.manager.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class CartServiceImp implements CartService {
    @Autowired
    CartRepository cartRepository;

    @Autowired
    ProductRepository productRepository;


    @Override
    public Map<String, Object> getCartInfoByUsername(String username) {
        Map<String, Object> mapResponse = new LinkedHashMap<>();
        mapResponse.put("status", "200");

        List<RowCartInformation> rowCartInformationList = new ArrayList<>();

        List<Cart> listCart = cartRepository.getCartInfoByUserId(username);
        for (Cart cart : listCart) {
            RowCartInformation rowCartInformation = new RowCartInformation();
            Product product = productRepository.getProductById(cart.getProductId());
            rowCartInformation.setCartId(cart.getId());
            rowCartInformation.setProductId(product.getId());
            rowCartInformation.setName(product.getName());
            rowCartInformation.setImage(product.getImage());
            rowCartInformation.setPrice(product.getPrice());
            rowCartInformation.setQuantity(cart.getQuantity());
            rowCartInformationList.add(rowCartInformation);
        }

        mapResponse.put("items", rowCartInformationList);

        return mapResponse;
    }

    @Override
    public Map<String, Object> disableProductFromCart(Integer id) {
        Integer deletedValue = cartRepository.disableProductFromCart(id);
        Map<String, Object> mapResponse = new LinkedHashMap<>();
        if (deletedValue > 0) {
            mapResponse.put("status", "200");
            mapResponse.put("message", "Deleted user!");
        }
        return mapResponse;
    }

    @Override
    public Map<String, Object> insert(Cart cart) throws BodyEmptyException,
            SQLViolationExceptionHandler {
        Map<String, Object> map = new LinkedHashMap<>();
        if (cart == null) {
            throw new BodyEmptyException("please enter information user!");
        }
        Cart cart1 = cartRepository.getByUserNameAndProductId(cart.getUsername(), cart.getProductId());
        if (cart1 == null) {
            Cart cartInsert = cartRepository.insert(cart);
            map.put("status", "201");
            map.put("message", "Created cart!");
            map.put("items", cartInsert);
            return map;
        } else {
            int result = cartRepository.updateQuantity(cart);
            if (result <= 0) {
                throw new BodyEmptyException("please enter information user!");
            }
            map.put("status", "201");
            map.put("message", "Created cart!");
//            map.put("items", cartInsert);
            return map;
        }
    }
}
