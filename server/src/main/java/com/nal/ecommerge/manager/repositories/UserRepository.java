package com.nal.ecommerge.manager.repositories;

import com.nal.ecommerge.manager.models.User;

import java.util.List;
import java.util.Optional;
/**
 * @author : duynv, vunv, thangth, hungpn
 * @version 1.0
 */
public interface UserRepository {
    User insertUserFromAdmin(User User) ;

    Integer updateUserByIdFromAdmin(User User, int id);

    User findUserById(int id);

    Optional<User> findUserByUsername(String username);

    List<User> getUsers();

    Integer registerUser(User User);

    Integer deleteUserById(int id);

    User getUserByUsername(String username);

    User findUserByUsernameAndPassword(String username, String password);

    Integer updateUserByIdButNotChangePasswordFromAdmin(User User, int id);
}
