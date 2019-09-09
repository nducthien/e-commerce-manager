package com.nal.ecommerge.manager.services;

import com.nal.ecommerge.manager.exceptions.SQLViolationExceptionHandler;
import com.nal.ecommerge.manager.models.User;

import java.util.Map;

/**
 * @author : duynv, vunv, hungpn, thangth
 * @version 1.0
 */
public interface UserService {

    User findUserById(int id);

    Map<String, Object> getUsers();

    User findUserByUsername(String Username);

    Map<String, Object> insertUserFromAdmin(User User) throws SQLViolationExceptionHandler;

    Map<String, Object> registerUser(User User);

    Map<String, Object> updateUserByIdForAdmin(User User, int id);

    Map<String, Object> deleteUserById(int id);


}
