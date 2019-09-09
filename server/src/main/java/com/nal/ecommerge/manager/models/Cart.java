package com.nal.ecommerge.manager.models;

public class Cart {

    private Integer id;
    private String username;
    private Integer productId;
    private String status;
    private Integer quantity;

    public Cart() {
    }

    public Cart(Integer id, String username, Integer productId, String status, Integer quantity) {
        this.id = id;
        this.username = username;
        this.productId = productId;
        this.status = status;
        this.quantity = quantity;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
