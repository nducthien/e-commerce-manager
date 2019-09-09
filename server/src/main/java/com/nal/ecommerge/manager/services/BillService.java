package com.nal.ecommerge.manager.services;

import com.nal.ecommerge.manager.models.Bill;

import java.util.Map;

public interface BillService {

  Map<String, Object> insert(Bill bill);

  Map<String, Object> getAllBill();

  Map<String, Object> getListBillByUsername(String username);

  Map<String, Object> getListBillByIntervalCreatedTime(String fromTime, String toTime);

  Map<String, Object> getListBillByIntervalCreatedTimeAndUsername(String fromTime, String toTime, String username);

  Bill getBillById(Integer id);

  Bill getBillByIdAndUsername(Integer billId, String username);

  Map<String, Object> updateStatusForBillById(Integer billId, String status);
}
