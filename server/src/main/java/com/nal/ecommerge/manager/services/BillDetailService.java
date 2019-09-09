package com.nal.ecommerge.manager.services;

import com.nal.ecommerge.manager.models.BillDetail;

import java.util.List;

public interface BillDetailService {

  void insert(BillDetail billDetail);

  List<BillDetail> getBillDetailForBill(Integer billId);
}
