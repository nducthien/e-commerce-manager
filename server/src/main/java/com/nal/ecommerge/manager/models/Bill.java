package com.nal.ecommerge.manager.models;

import java.util.List;
import java.util.Map;

public class Bill {
  private Integer id;
  private String username;
  private String createdTime;
  private String receiver;
  private String address;
  private String phoneNumber;
  private String status;
  private List<BillDetail> productList;

  public Bill() {
  }

  public Bill(Integer id, String username, String createdTime, String receiver, String address, String phoneNumber, String status, List<BillDetail> productList) {
    this.id = id;
    this.username = username;
    this.createdTime = createdTime;
    this.receiver = receiver;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.status = status;
    this.productList = productList;
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

  public String getCreatedTime() {
    return createdTime;
  }

  public void setCreatedTime(String createdTime) {
    this.createdTime = createdTime;
  }

  public String getReceiver() {
    return receiver;
  }

  public void setReceiver(String receiver) {
    this.receiver = receiver;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public List<BillDetail> getProductList() {
    return productList;
  }

  public void setProductList(List<BillDetail> productList) {
    this.productList = productList;
  }
}
