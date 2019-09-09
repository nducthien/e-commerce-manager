package com.nal.ecommerge.manager.repositories;
import com.nal.ecommerge.manager.models.Authentication;
/*
 * @author : duynv
 * @version 1.0
 */
public interface AuthenticationRepository {
    int insertAuthentication(Authentication authentication);

    Authentication getAuthenticationById(Integer authenticationId);

    Authentication getAuthenticationByTokenName(String token);

}
