package com.nal.ecommerge.manager.controller;

import com.nal.ecommerge.manager.exceptions.IncorrectUsernameAndPasswordException;
import com.nal.ecommerge.manager.services.LoginService;
import com.nal.ecommerge.manager.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * @author duynv
 * @version 1.0
 */
@RestController
@RequestMapping("users/login")
public class LoginController {

    @Autowired
    LoginService loginService;

    @PostMapping(produces = {"application/json", "application/xml"},
            consumes = {"application/json"})
    public ResponseEntity checkLogin(@RequestBody User user) throws IncorrectUsernameAndPasswordException {
        Map<String, Object> mapItem = loginService.checkLogin(user.getUsername(), user.getPassword());

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("token", (String) mapItem.get("token"));
        mapItem.remove("token");

        return ResponseEntity.ok().headers(httpHeaders).body(mapItem);
    }
}
