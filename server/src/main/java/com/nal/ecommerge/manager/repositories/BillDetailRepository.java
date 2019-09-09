package com.nal.ecommerge.manager.repositories;

import com.nal.ecommerge.manager.models.BillDetail;

import java.util.List;

public interface BillDetailRepository {

  Integer insert(BillDetail billDetail);

  List<BillDetail> getBillDetailForBill(Integer billId);
}
