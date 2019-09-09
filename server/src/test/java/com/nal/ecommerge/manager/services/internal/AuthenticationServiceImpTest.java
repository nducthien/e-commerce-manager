package com.nal.ecommerge.manager.services.internal;


import com.nal.ecommerge.manager.exceptions.LoginExpiredException;
import com.nal.ecommerge.manager.models.Authentication;
import com.nal.ecommerge.manager.repositories.AuthenticationRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@WebMvcTest(AuthenticationServiceImp.class)
public class AuthenticationServiceImpTest {
    @MockBean
    AuthenticationRepository authenticationRepository;

    @InjectMocks
    AuthenticationServiceImp authenticationServiceImp;

    @Autowired
    MockMvc mockMvc;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test(expected = LoginExpiredException.class)
    public void checkExpiryDateToken_ShouldThrow_LoginExpiredException_IfTimeOutExpired() {
        String token = "123456-token-string";
        String timeCreatedToken = "31-5-2019 18:34:11";

        Authentication authentication = new Authentication();
        authentication.setTokenCreatedTime(timeCreatedToken);

        when(authenticationRepository.getAuthenticationByTokenName(token)).thenReturn(authentication);

        assertTrue(authenticationServiceImp.checkExpiryDateToken(token));
    }

    @Test
    public void checkExpiryDateToken_ShouldReturnTrue_IfNotTimeOutExpired() {
        String token = "123456-token-string";
        String timeCreatedToken = "31-5-2023 18:34:11";

        Authentication authentication = new Authentication();
        authentication.setTokenCreatedTime(timeCreatedToken);

        when(authenticationRepository.getAuthenticationByTokenName(token)).thenReturn(authentication);
        boolean value = authenticationServiceImp.checkExpiryDateToken(token);
        assertTrue(value);
    }

    @Test(expected = LoginExpiredException.class)
    public void checkExpiryDateToken_ShouldThrow_LoginExpiredException_IfTimeOutExpiredWithFiveMinute() {
        String timeCreatedToken = getTimeBefore(-5);

        String token = "123456-token-string";
        Authentication authentication = new Authentication();
        authentication.setTokenCreatedTime(timeCreatedToken);

        when(authenticationRepository.getAuthenticationByTokenName(token)).thenReturn(authentication);

        authenticationServiceImp.checkExpiryDateToken(token);
    }

    public String getTimeBefore(int amount) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, amount);

        Date timeBefore = calendar.getTime();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-M-yyyy kk:mm:ss");

        String dateTimeFormatted = simpleDateFormat.format(timeBefore);
        return dateTimeFormatted;
    }

    @Test
    public void insertAuthentication() {
    }
}