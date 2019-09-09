package com.nal.ecommerge.manager.services;

import com.nal.ecommerge.manager.exceptions.IncorrectUsernameAndPasswordException;

import java.util.Map;
/**
 * @author : duynv
 * @version 1.0
 */
public interface LoginService {
    Map<String, Object> checkLogin(String username, String password) throws IncorrectUsernameAndPasswordException;
}