package com.nal.ecommerge.manager.services.internal;

import com.nal.ecommerge.manager.exceptions.IdInvalidException;
import com.nal.ecommerge.manager.exceptions.NullArgumentsException;
import com.nal.ecommerge.manager.models.BillDetail;
import com.nal.ecommerge.manager.repositories.BillDetailRepository;
import com.nal.ecommerge.manager.services.BillDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillDetailServiceImp implements BillDetailService {
    @Autowired
    BillDetailRepository billDetailRepository;

    @Override
    public void insert(BillDetail billDetail) {
        if (billDetail == null) {
            throw new NullArgumentsException("bill detail is null");
        }
        billDetailRepository.insert(billDetail);
    }

    @Override
    public List<BillDetail> getBillDetailForBill(Integer billId) {
        if (billId <= 0) {
            throw new IdInvalidException("id must be great than zero");
        }
        return billDetailRepository.getBillDetailForBill(billId);
    }
}
