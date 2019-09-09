package com.nal.ecommerge.manager.services.internal;

import com.nal.ecommerge.manager.exceptions.*;
import com.nal.ecommerge.manager.models.Bill;
import com.nal.ecommerge.manager.models.BillDetail;
import com.nal.ecommerge.manager.models.Product;
import com.nal.ecommerge.manager.repositories.BillRepository;
import com.nal.ecommerge.manager.services.BillDetailService;
import com.nal.ecommerge.manager.services.BillService;
import com.nal.ecommerge.manager.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class BillServiceImp implements BillService {
    @Autowired
    BillRepository billRepository;

    @Autowired
    BillDetailService billDetailService;

    @Autowired
    ProductService productService;

    @Override
    public Map<String, Object> insert(Bill bill) {
        if (bill == null) {
            throw new BadRequestException("bill is null");
        }

        bill.setStatus("do");
        bill.setCreatedTime(getCurrentTime());
        Integer billId = billRepository.insert(bill);

        for (BillDetail billDetail : bill.getProductList()) {
            billDetail.setBillId(billId);
            billDetailService.insert(billDetail);
        }

        Map<String, Object> map = new LinkedHashMap<>();
        map.put("status", "201");
        map.put("message", "Created bill!");
        return map;
    }

    @Override
    public Map<String, Object> getAllBill() {
        List<Bill> billList = billRepository.getAllBill();

        List<Bill> listBillDetail = setProductListForBill(billList);

        Map<String, Object> map = new LinkedHashMap<>();
        map.put("status", "200");
        map.put("items", listBillDetail);
        return map;
    }

    @Override
    public Map<String, Object> getListBillByUsername(String username) {
        if (username == null) {
            throw new BadRequestException("username is null");
        }

        List<Bill> billList = billRepository.getListBillByUsername(username);

        List<Bill> listBillDetail = setProductListForBill(billList);

        Map<String, Object> map = new LinkedHashMap<>();
        map.put("status", "200");
        map.put("items", listBillDetail);
        return map;
    }

    @Override
    public Map<String, Object> getListBillByIntervalCreatedTime(String fromTime, String toTime) {
        if (fromTime == null || fromTime == "") {
            throw new BadRequestException("fromTime is null");
        }
        if (toTime == null || toTime == "") {
            throw new BadRequestException("toTime is null");
        }

        List<Bill> billList = billRepository.getListBillByIntervalCreatedTime(fromTime, toTime);

        try {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-MM-yyyy");
            Date fromTimeDate = simpleDateFormat.parse(fromTime);
            Date toTimeDate = simpleDateFormat.parse(toTime);
            if (fromTimeDate.compareTo(toTimeDate) > 0) {
                throw new IntervalCreatedTimeException("time after must be great than time before");
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }

        List<Bill> listBillDetail = setProductListForBill(billList);

        Map<String, Object> map = new LinkedHashMap<>();
        map.put("status", "200");
        map.put("items", listBillDetail);
        return map;
    }

    @Override
    public Map<String, Object> getListBillByIntervalCreatedTimeAndUsername(String fromTime,
                                                                           String toTime,
                                                                           String username) {
        if (fromTime == null || fromTime == "") {
            throw new BadRequestException("fromTime is null");
        }
        if (toTime == null || toTime == "") {
            throw new BadRequestException("toTime is null");
        }
        if (username == null || username == "") {
            throw new BadRequestException("username is null");
        }
        List<Bill> billList = billRepository.getListBillByIntervalCreatedTimeAndUsername(fromTime, toTime, username);
        try {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-MM-yyyy");
            Date fromTimeDate = simpleDateFormat.parse(fromTime);
            Date toTimeDate = simpleDateFormat.parse(toTime);
            System.out.println("from time is : " + fromTimeDate);
            System.out.println("to time is : " + toTimeDate);
            if (fromTimeDate.compareTo(toTimeDate) > 0) {
                throw new IntervalCreatedTimeException("time after must be great than time before");
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }

        List<Bill> listBillDetail = setProductListForBill(billList);

        Map<String, Object> map = new LinkedHashMap<>();
        map.put("status", "200");
        map.put("items", listBillDetail);
        return map;
    }

    @Override
    public Bill getBillById(Integer id) {
        if (id <= 0) {
            throw new IdInvalidException("id must be great than zero");
        }
        Optional<Bill> billOptional = billRepository.getBillById(id);
        if (!billOptional.isPresent()) {
            throw new ResourceNotFoundException("Bill not found!");
        }
        Bill bill = billOptional.get();

        List<BillDetail> billDetailList = billDetailService.getBillDetailForBill(bill.getId());

        addMoreInfoForBillDetail(billDetailList);

        bill.setProductList(billDetailList);
        return bill;
    }

  @Override
  public Bill getBillByIdAndUsername(Integer billId, String username) {
    Optional<Bill> billOptional = billRepository.getBillByIdAndUsername(billId, username);
    if (!billOptional.isPresent()) {
      throw new ResourceNotFoundException("Bill not found!");
    }
    Bill bill = billOptional.get();

    List<BillDetail> billDetailList = billDetailService.getBillDetailForBill(bill.getId());

    addMoreInfoForBillDetail(billDetailList);

    bill.setProductList(billDetailList);
    return bill;
  }

  @Override
    public Map<String, Object> updateStatusForBillById(Integer billId, String status) {
        if (billId <= 0) {
            throw new IdInvalidException("id must be great than zero");
        }
        if (status == null) {
            throw new BadRequestException("status must be not null");
        }
        billRepository.updateStatusForBillById(billId, status);
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("status", "200");
        map.put("message", "Updated!");
        return map;
    }

    public List<Bill> setProductListForBill(List<Bill> billList) {
        if (billList == null) {
            throw new BodyEmptyException("product list is null");
        }
        for (Bill bill : billList) {
            List<BillDetail> billDetailList = billDetailService.getBillDetailForBill(bill.getId());

            addMoreInfoForBillDetail(billDetailList);

            bill.setProductList(billDetailList);
        }
        return billList;
    }

    public List<BillDetail> addMoreInfoForBillDetail(List<BillDetail> billDetailList) {
        for (BillDetail billDetail : billDetailList) {
            Product product = productService.findProductById(billDetail.getProductId());
            billDetail.setName(product.getName());
            billDetail.setImage(product.getImage());
            billDetail.setPrice(product.getPrice());
        }
        return billDetailList;
    }

    public String getCurrentTime() {
        Calendar calendar = Calendar.getInstance();
        Date currentTime = calendar.getTime();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-MM-yyyy");
        String dateTimeFormatted = simpleDateFormat.format(currentTime);
        return dateTimeFormatted;
    }
}
