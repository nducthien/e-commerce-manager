package com.nal.ecommerge.manager.services.internal;


import com.nal.ecommerge.manager.exceptions.IncorrectUsernameAndPasswordException;
import com.nal.ecommerge.manager.models.User;
import com.nal.ecommerge.manager.repositories.UserRepository;
import com.nal.ecommerge.manager.services.AuthenticationService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.LinkedHashMap;
import java.util.Map;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@WebMvcTest(UserServiceImp.class)
public class LoginServiceImpTest {
    @MockBean
    UserRepository userRepository;

    @InjectMocks
    LoginServiceImp loginServiceImp;

    @MockBean
    AuthenticationService authenticationService;

    @Autowired
    MockMvc mockMvc;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test(expected = IncorrectUsernameAndPasswordException.class)
    public void checkLogin_Should_ThrowIncorrectUsernameAndPasswordException_IfUserNameOrPassWordIncorrect() {
        String username = "admin";
        String password = "incorrectPassword";
        String incorrectPasswordEncoded = "7e0c1055d99678f0635a1bbb2f790c80";

        when(userRepository.findUserByUsernameAndPassword(username, incorrectPasswordEncoded)).
                thenThrow(EmptyResultDataAccessException.class);

        loginServiceImp.checkLogin(username, password);
    }

    @Test
    public void checkLogin_Should_ReturnMapWithRoleEquals1_IfAccountIsAdmin() {
        String username = "admin";
        String password = "123456";
        String incorrectPasswordEncoded = "e10adc3949ba59abbe56e057f20f883e";

        User user = new User();
        user.setRole(1);
        when(userRepository.findUserByUsernameAndPassword(username, incorrectPasswordEncoded)).thenReturn(user);

        Map<String, Object> expectedMap = new LinkedHashMap<>();
        expectedMap.put("status", "200");
        expectedMap.put("role", user.getRole());

        Map<String, Object> actualMap = loginServiceImp.checkLogin(username, password);
        actualMap.remove("token");
        assertEquals(expectedMap, actualMap);
    }

    @Test
    public void checkLogin_Should_ReturnMapWithRoleEqualsZero_IfAccountIsUser() {
        String username = "admin";
        String password = "123456";
        String incorrectPasswordEncoded = "e10adc3949ba59abbe56e057f20f883e";

        User user = new User();
        user.setRole(0);

        when(userRepository.findUserByUsernameAndPassword(username, incorrectPasswordEncoded)).thenReturn(user);

        Map<String, Object> expectedMap = new LinkedHashMap<>();
        expectedMap.put("status", "200");
        expectedMap.put("role", user.getRole());

        Map<String, Object> actualMap = loginServiceImp.checkLogin(username, password);
        actualMap.remove("token");
        assertEquals(expectedMap, actualMap);
    }
}