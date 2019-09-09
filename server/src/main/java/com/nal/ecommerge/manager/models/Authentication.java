package com.nal.ecommerge.manager.models;
/**
 * @author : duynv
 * @version 1.0
 */
public class Authentication {

    Integer userId;

    String token;

    String tokenCreatedTime;

    public Authentication() {
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTokenCreatedTime() {
        return tokenCreatedTime;
    }

    public void setTokenCreatedTime(String tokenCreatedTime) {
        this.tokenCreatedTime = tokenCreatedTime;
    }

}
