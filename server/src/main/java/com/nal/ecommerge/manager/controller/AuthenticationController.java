package com.nal.ecommerge.manager.controller;

import com.nal.ecommerge.manager.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author duynv
 * @version 1.0
 */
@RestController
@RequestMapping("users/secured")
public class AuthenticationController {
    @Autowired
    AuthenticationService authenticationService;

    @GetMapping
    public ResponseEntity checkExpiryDateAuthentication(@RequestHeader String token) {
        authenticationService.checkExpiryDateToken(token);
        return new ResponseEntity(HttpStatus.OK);
    }
}
