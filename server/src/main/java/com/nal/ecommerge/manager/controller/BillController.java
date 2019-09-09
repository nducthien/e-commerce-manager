package com.nal.ecommerge.manager.controller;

import com.nal.ecommerge.manager.exceptions.BodyEmptyException;
import com.nal.ecommerge.manager.models.Bill;
import com.nal.ecommerge.manager.services.AuthenticationService;
import com.nal.ecommerge.manager.services.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("bills")
public class BillController {
    @Autowired
    BillService billService;

    @Autowired
    AuthenticationService authenticationService;

    @PostMapping()
    public ResponseEntity<Map> insertBill(@RequestBody(required = false) Bill bill,
                                          @RequestHeader String token)
            throws BodyEmptyException {
        authenticationService.checkExpiryDateToken(token);
        Map<String, Object> map = billService.insert(bill);
        return new ResponseEntity(map, HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity getAllBill(@RequestHeader String token) {
        authenticationService.checkExpiryDateToken(token);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("token", token);
        Map<String, Object> mapRespondBill = billService.getAllBill();
        return new ResponseEntity(mapRespondBill, responseHeaders, HttpStatus.OK);
    }

    @GetMapping("/search/{username}")
    public ResponseEntity getListBillByUsername(@PathVariable("username") String username,

                                                @RequestHeader String token) {
        authenticationService.checkExpiryDateToken(token);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("token", token);
        Map<String, Object> mapRespondBill = billService.getListBillByUsername(username);
        return new ResponseEntity(mapRespondBill, responseHeaders, HttpStatus.OK);
    }

    @GetMapping("/fields")
    public ResponseEntity searchBillsByInternalCreatedTime(@RequestParam(value = "fromTime", required = false) String fromTime,
                                                           @RequestParam(value = "toTime", required = false) String toTime,
                                                           @RequestHeader String token) {
        authenticationService.checkExpiryDateToken(token);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("token", token);
        Map<String, Object> mapRespondBill = billService.getListBillByIntervalCreatedTime(fromTime, toTime);
        return new ResponseEntity(mapRespondBill, responseHeaders, HttpStatus.OK);
    }

    @GetMapping("/params")
    public ResponseEntity searchBillsByInternalCreatedTimeAndUsername(@RequestParam(value = "fromTime", required = false)
                                                                              String fromTime,
                                                                      @RequestParam(value = "toTime", required = false)
                                                                              String toTime,
                                                                      @RequestParam(value = "username", required = false)
                                                                              String username,
                                                                      @RequestHeader String token) {
        authenticationService.checkExpiryDateToken(token);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("token", token);
        Map<String, Object> mapRespondBill = billService.getListBillByIntervalCreatedTimeAndUsername(fromTime, toTime, username);
        return new ResponseEntity(mapRespondBill, responseHeaders, HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity getBillByIdForAdmin(@PathVariable("id") Integer id,
                                              @RequestHeader String token) {
        authenticationService.checkExpiryDateToken(token);
        Bill bill = billService.getBillById(id);
        return new ResponseEntity(bill, HttpStatus.OK);
    }

    @GetMapping("/{id}/user")
    public ResponseEntity getBillByIdAndUsername(@PathVariable("id") Integer billId,
                                                 @RequestParam(value = "username", required = false) String username,
                                                 @RequestHeader String token) {
        System.out.println("ok");
        authenticationService.checkExpiryDateToken(token);
        Bill bill = billService.getBillByIdAndUsername(billId, username);
        return new ResponseEntity(bill, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateStatusForBill(@PathVariable("id") Integer billId,
                                              @RequestBody(required = false) Bill bill,
                                              @RequestHeader String token) {
        authenticationService.checkExpiryDateToken(token);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("token", token);
        Map<String, Object> mapRespondBill = billService.updateStatusForBillById(billId, bill.getStatus());
        return new ResponseEntity(mapRespondBill, responseHeaders, HttpStatus.OK);
    }
}
