package com.nal.ecommerge.manager.services.internal;

import com.nal.ecommerge.manager.exceptions.BodyEmptyException;
import com.nal.ecommerge.manager.exceptions.DuplicateUsernameException;
import com.nal.ecommerge.manager.exceptions.ResourceNotFoundException;
import com.nal.ecommerge.manager.models.User;
import com.nal.ecommerge.manager.repositories.UserRepository;
import org.junit.Assert;
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

import java.util.*;

import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@WebMvcTest(UserServiceImp.class)
public class UserServiceImpTest {
    @MockBean
    UserRepository userRepository;

    @Autowired
    MockMvc mockMvc;

    @InjectMocks
    UserServiceImp userServiceImp;

    @Test
    public void findUserById() {
    }

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void findUserByUsername_Should_ReturnUser_IfUserIsExistsOnDatabase() {
        User user = new User();
        String username = "admin";
        String password = "123456";
        user.setUsername(username);
        user.setPassword(password);
        when(userRepository.findUserByUsername(username)).thenReturn(java.util.Optional.of(user));
        userServiceImp.findUserByUsername(username);
    }

    @Test(expected = ResourceNotFoundException.class)
    public void findUserByUsername_Should_ThrowResourceNotFoundException_IfUserIsNotExistsOnDatabase() {
        String username = "userNotExists";
        when(userRepository.findUserByUsername(username)).thenReturn(Optional.empty());
        userServiceImp.findUserByUsername(username);
    }

    @Test(expected = ResourceNotFoundException.class)
    public void getUsers_ShouldThrowResourceNotFoundException_IfDatabaseIsNotContainUsers() {
        when(userRepository.getUsers()).thenReturn(Collections.emptyList());
        userServiceImp.getUsers();

    }

    @Test
    public void getUsers_ShouldReturnListUser_IfDatabaseIsContainUsers() {
        User user = new User();
        String username = "admin";
        String password = "123456";
        user.setUsername(username);
        user.setPassword(password);

        List<User> listUser = new LinkedList<>();
        listUser.add(user);

        when(userRepository.getUsers()).thenReturn(listUser);

        Map<String, Object> expectedMap = new LinkedHashMap<>();
        expectedMap.put("status", "200");
        expectedMap.put("message", "success");
        expectedMap.put("items", listUser);

        Map<String, Object> actualMap = userServiceImp.getUsers();

        Assert.assertEquals(expectedMap, actualMap);

    }

    @Test
    public void insertUserFromAdmin_ShouldReturnMapWithStatus201_IfInserted() {

        when(userRepository.findUserByUsername("admin")).thenReturn(Optional.empty());
        User user = new User();
        user.setUsername("userNotExisted");
        user.setPassword("newPassword");
        when(userRepository.insertUserFromAdmin(user)).thenReturn(user);
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("status", "201");
        map.put("message", "Created user!");
        map.put("items", user);

    }

    @Test(expected = BodyEmptyException.class)
    public void insertUserFromAdmin_ShouldThrowBodyEmptyException_IfBodyRequestIsEmpty() {
        userServiceImp.insertUserFromAdmin(null);
    }

    @Test(expected = DuplicateUsernameException.class)
    public void insertUserFromAdmin_ShouldThrowDuplicateUsernameException_IfUserIsExisted() {
        User user = new User();
        String username = "admin";
        String password = "123456";
        user.setUsername(username);
        user.setPassword(password);

        when(userRepository.findUserByUsername(username)).thenReturn(java.util.Optional.of(user));

        userServiceImp.insertUserFromAdmin(user);
    }

    @Test(expected = DuplicateUsernameException.class)
    public void registerUser_ShouldThrowDuplicateUsernameException_IfUserIsExisted() {
        User user = new User();
        String username = "hungpn";
        String password = "123456";
        user.setUsername(username);
        user.setPassword(password);

        when(userRepository.findUserByUsername(username)).thenReturn(java.util.Optional.of(user));

        userServiceImp.registerUser(user);
    }

    @Test(expected = BodyEmptyException.class)
    public void registerUser_ShouldThrowBodyEmptyException_IfBodyRequestIsEmpty() {
        userServiceImp.registerUser(null);
    }

    @Test(expected = ResourceNotFoundException.class)
    public void updateUserByIdForAdmin_ShouldThrowResourceNotFoundException_IfUserIsNotExisted() {
        Integer userId = 1;
        User user = new User();
        String username = "hungpn";
        String password = "123456";
        user.setUsername(username);
        user.setPassword(password);
        when(userRepository.updateUserByIdFromAdmin(user, userId)).thenReturn(0);
        userServiceImp.updateUserByIdForAdmin(user, userId);
    }

    @Test(expected = BodyEmptyException.class)
    public void updateUserByIdForAdmin_ShouldThrowBodyEmptyException_IfBodyRequestIsEmpty() {
        userServiceImp.registerUser(null);
    }

    @Test(expected = ResourceNotFoundException.class)
    public void deleteUserById_ShouldThrowResourceNotFoundException_IfUserIsNotExisted() {
        Integer userId = 1;
        when(userRepository.deleteUserById(userId)).thenReturn(0);
        userServiceImp.deleteUserById(userId);
    }
}