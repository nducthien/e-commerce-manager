package com.nal.ecommerge.manager.services;

import com.nal.ecommerge.manager.repositories.UserRepository;
import com.nal.ecommerge.manager.services.internal.UserServiceImp;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringRunner.class)
@WebMvcTest(UserServiceImp.class)
public class UserServiceTest {
    @MockBean
    UserRepository repository;

    @Autowired
    MockMvc mockMvc;

    @Test
    public void getUsers() {

    }

    @Test
    public void findUserByUsername() {
    }

    @Test
    public void insertUserForAdmin() {
    }

    @Test
    public void registerUser() {
    }

    @Test
    public void updateUserByIdForAdmin() {
    }

    @Test
    public void deleteUserById() {

    }
}