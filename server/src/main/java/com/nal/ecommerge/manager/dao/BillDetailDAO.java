package com.nal.ecommerge.manager.dao;

import com.nal.ecommerge.manager.models.BillDetail;
import com.nal.ecommerge.manager.repositories.BillDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.util.List;

@Repository
public class BillDetailDAO implements BillDetailRepository {
  @Autowired
  JdbcTemplate jdbcTemplate;

  @Override
  public Integer insert(BillDetail billDetail) {
    String sql = "INSERT INTO bill_product(bill_id, product_id, quantity) VALUES(?, ?, ?)";
    return this.jdbcTemplate.update(sql, billDetail.getBillId(), billDetail.getProductId(), billDetail.getQuantity());
  }

  @Override
  public List<BillDetail> getBillDetailForBill(Integer billId) {
    String sql = "SELECT product_id, bill_id, quantity " +
            "FROM bill_product WHERE bill_id=?";
    return jdbcTemplate.query(sql, billDetailRowMapper(), billId);
  }

  public static RowMapper<BillDetail> billDetailRowMapper() {
    return (ResultSet resultSet, int rowNum) -> {
      BillDetail billDetail = new BillDetail();
      billDetail.setBillId(resultSet.getInt("bill_id"));
      billDetail.setProductId(resultSet.getInt("product_id"));
      billDetail.setQuantity(resultSet.getInt("quantity"));
      return billDetail;
    };
  }
}
