package com.nal.ecommerge.manager.repositories;

import com.nal.ecommerge.manager.models.Bill;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface BillRepository {

    Integer insert(Bill bill);

    List<Bill> getAllBill();


    List<Bill>getListBillByUsername(String username);



    List<Bill> getListBillByIntervalCreatedTime(String fromTime, String toTime);


  Optional<Bill> getBillByIdAndUsername(Integer billId, String username);


    Optional<Bill> getBillById(Integer id);

    Integer updateStatusForBillById(Integer billId, String status);

    List<Bill> getListBillByIntervalCreatedTimeAndUsername(String fromTime, String toTime, String username);

}
