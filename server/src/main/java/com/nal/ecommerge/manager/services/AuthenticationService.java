package com.nal.ecommerge.manager.services;

import com.nal.ecommerge.manager.models.Authentication;
/**
 * @author : duynv
 * @version 1.0
 */
public interface AuthenticationService {
    boolean checkExpiryDateToken(String token);

    boolean insertAuthentication(Authentication authentication);
}
