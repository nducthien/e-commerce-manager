package com.nal.ecommerge.manager.services.internal;

import com.nal.ecommerge.manager.exceptions.BodyEmptyException;
import com.nal.ecommerge.manager.exceptions.DuplicateUsernameException;
import com.nal.ecommerge.manager.exceptions.ResourceNotFoundException;
import com.nal.ecommerge.manager.exceptions.SQLViolationExceptionHandler;
import com.nal.ecommerge.manager.models.User;
import com.nal.ecommerge.manager.repositories.UserRepository;
import com.nal.ecommerge.manager.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * @author : duynv,thangth,hungpn,vunv
 * @version 1.0
 */
@Service
public class UserServiceImp implements UserService {
    @Autowired
    UserRepository userRepository;

    @Override
    public User findUserById(int id) {
        User user = userRepository.findUserById(id);
        return user;
    }

    @Override
    public User findUserByUsername(String username) throws ResourceNotFoundException {
        Optional<User> userOptional = userRepository.findUserByUsername(username);
        if (!userOptional.isPresent()) {
            throw new ResourceNotFoundException("User not found!");
        }
        return userOptional.get();
    }

    @Override
    public Map<String, Object> getUsers() {
        List<User> listUser = userRepository.getUsers();
        if (listUser.isEmpty()) {
            throw new ResourceNotFoundException("not found any user");
        }
        Map<String, Object> mapResponseUser = new LinkedHashMap<>();
        mapResponseUser.put("status", "200");
        mapResponseUser.put("message", "success");
        mapResponseUser.put("items", listUser);

        return mapResponseUser;
    }

    @Override
    public Map<String, Object> insertUserFromAdmin(User user) throws BodyEmptyException,
            SQLViolationExceptionHandler {
        if (user == null) {
            throw new BodyEmptyException("please enter information user!");
        }
        try {
            findUserByUsername(user.getUsername());
            throw new DuplicateUsernameException("Username is exists!");
        } catch (ResourceNotFoundException e) {
            user.setPassword(convertPasswordToMD5(user.getPassword()));
            User newUser = userRepository.insertUserFromAdmin(user);

            Map<String, Object> map = new LinkedHashMap<>();
            map.put("status", "201");
            map.put("message", "Created user!");
            map.put("items", newUser);

            return map;
        }
    }

    @Override
    public Map<String, Object> registerUser(User user) throws BodyEmptyException {
        if (user == null) {
            throw new BodyEmptyException("please enter information user!");
        }
        try {
            findUserByUsername(user.getUsername());
            throw new DuplicateUsernameException("Username is exists!");
        } catch (ResourceNotFoundException e) {
            user.setPassword(convertPasswordToMD5(user.getPassword()));
            userRepository.registerUser(user);
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("status", "201");
            map.put("message", "Created user!");
            return map;
        }
    }

    @Override
    public Map<String, Object> updateUserByIdForAdmin(User user, int id) {
        if (user == null) {
            throw new BodyEmptyException("please enter information user!");
        }

        Map<String, Object> mapResponse = null;
        String password = user.getPassword();
        if (password == null || password.trim().equals("")) {
            userRepository.updateUserByIdButNotChangePasswordFromAdmin(user, id);
        } else {
            String passwordEncoded = convertPasswordToMD5(password);
            user.setPassword(passwordEncoded);

            int updatedValue = userRepository.updateUserByIdFromAdmin(user, id);
            if (updatedValue <= 0) {
                throw new ResourceNotFoundException("Not Found!");
            }

            mapResponse = new LinkedHashMap<>();
            mapResponse.put("status", "200");
            mapResponse.put("message", "Updated user!");
        }

        return mapResponse;
    }

    @Override
    public Map<String, Object> deleteUserById(int id) {
        int deletedValue = userRepository.deleteUserById(id);
        Map<String, Object> mapResponse = new LinkedHashMap<>();
        if (deletedValue > 0) {
            mapResponse.put("status", "200");
            mapResponse.put("message", "Deleted user!");
            return mapResponse;
        } else {
            throw new ResourceNotFoundException("Not Found!");
        }
    }

    public String convertPasswordToMD5(String password) {
        return DigestUtils.md5DigestAsHex(password.getBytes());
    }
}
