package com.nal.ecommerge.manager.services.internal;

import com.nal.ecommerge.manager.exceptions.IncorrectUsernameAndPasswordException;
import com.nal.ecommerge.manager.models.Authentication;
import com.nal.ecommerge.manager.models.User;
import com.nal.ecommerge.manager.repositories.UserRepository;
import com.nal.ecommerge.manager.services.AuthenticationService;
import com.nal.ecommerge.manager.services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author : duynv
 * @version 1.0
 */
@Service
public class LoginServiceImp implements LoginService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthenticationService authenticationService;

    @Override
    public Map<String, Object> checkLogin(String username, String password) {
        String passwordEncoded = encodePassword(password);
        User user;
        try {
            user = userRepository.findUserByUsernameAndPassword(username, passwordEncoded);
        } catch (EmptyResultDataAccessException e) {
            throw new IncorrectUsernameAndPasswordException("Incorrect username or password.");
        }

        Authentication authentication = new Authentication();
        authentication.setUserId(user.getId());

        String token = getRandomToken();
        authentication.setToken(token);

        String currentTime = getCurrentTime();
        authentication.setTokenCreatedTime(currentTime);

        authenticationService.insertAuthentication(authentication);

        Map<String, Object> map = new LinkedHashMap<>();
        map.put("status", "200");
        map.put("token", token);
        map.put("role", user.getRole());

        return map;
    }

    public String getRandomToken() {
        return UUID.randomUUID().toString();
    }

    public String getCurrentTime() {
        Calendar calendar = Calendar.getInstance();
        Date currentTime = calendar.getTime();

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-M-yyyy kk:mm:ss");
        String dateTimeFormatted = simpleDateFormat.format(currentTime);

        return dateTimeFormatted;
    }

    public String encodePassword(String password) {
        return DigestUtils.md5DigestAsHex(password.getBytes());
    }

}
