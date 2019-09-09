package com.nal.ecommerge.manager.services.internal;

import com.nal.ecommerge.manager.exceptions.LoginExpiredException;
import com.nal.ecommerge.manager.exceptions.ResourceNotFoundException;
import com.nal.ecommerge.manager.models.Authentication;
import com.nal.ecommerge.manager.repositories.AuthenticationRepository;
import com.nal.ecommerge.manager.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * @author : duynv
 * @version 1.0
 */
@Service
public class AuthenticationServiceImp implements AuthenticationService {
    @Autowired
    AuthenticationRepository authenticationRepository;

    @Override
    public boolean checkExpiryDateToken(String token) {
        Authentication authentication;
        try {
            authentication = authenticationRepository.getAuthenticationByTokenName(token);
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("expired authentication or not found token!");
        }
        Date timeCreatedToken = null;
        try {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-M-yyyy kk:mm:ss");
            timeCreatedToken = simpleDateFormat.parse(authentication.getTokenCreatedTime());
        } catch (ParseException e) {
            e.printStackTrace();
        }

        Date timeBefore = getTimeBefore(-50);
        if (timeBefore.compareTo(timeCreatedToken) > 0) {
            throw new LoginExpiredException("login expired, please login again!");
        }

        return true;
    }

    public Date getTimeBefore(int amount) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, amount);
        Date timeBefore = calendar.getTime();
        return timeBefore;
    }

    public boolean insertAuthentication(Authentication authentication) {
        int succeed = authenticationRepository.insertAuthentication(authentication);
        return succeed > 0;
    }
}