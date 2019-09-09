package com.nal.ecommerge.manager.dao;

import com.nal.ecommerge.manager.models.Bill;
import com.nal.ecommerge.manager.repositories.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;

@Repository
public class BillDAO implements BillRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;


    @Override
    public Integer insert(Bill bill) {
        String sql = "INSERT INTO bill(username, created_time, receiver, address, phone_number, status)" +
                " VALUES(?, STR_TO_DATE(?, '%d-%m-%Y'), ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        this.jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, bill.getUsername());
            ps.setString(2, bill.getCreatedTime());
            ps.setString(3, bill.getReceiver());
            ps.setString(4, bill.getAddress());
            ps.setString(5, bill.getPhoneNumber());
            ps.setString(6, bill.getStatus());
            return ps;
        }, keyHolder);

        Number key = keyHolder.getKey();
        return key.intValue();
    }

    @Override
    public List<Bill> getAllBill() {
        String sql = "SELECT id, username, created_time, receiver, address, phone_number, status " +
                "FROM bill ORDER BY id DESC";
        return jdbcTemplate.query(sql, billRowMapper());
    }

    @Override
    public List<Bill> getListBillByUsername(String username) {
        String sql = "SELECT id, username, created_time, receiver, address, phone_number, status " +
                "FROM bill WHERE username = ? ORDER BY id DESC";
        return jdbcTemplate.query(sql, billRowMapper(), username);
    }

    @Override
    public List<Bill> getListBillByIntervalCreatedTime(String fromTime, String toTime) {
        String sql = "SELECT id, username, created_time, receiver, address, phone_number, status " +
                "FROM bill WHERE created_time BETWEEN STR_TO_DATE(?, '%d-%m-%Y') AND STR_TO_DATE(?, '%d-%m-%Y')";
        return jdbcTemplate.query(sql, billRowMapper(), fromTime, toTime);
    }


    @Override
    public Optional<Bill> getBillById(Integer id) {
        String sql = "SELECT id, username, created_time, receiver, address, phone_number, status " +
                "FROM bill " +
                "WHERE id = ?";
        try {
            Bill bill = jdbcTemplate.queryForObject(sql, billRowMapper(), id);
            return Optional.of(bill);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }


  @Override
  public Optional<Bill> getBillByIdAndUsername(Integer billId, String username) {
    String sql = "SELECT id, username, created_time, receiver, address, phone_number, status " +
            "FROM bill " +
            "WHERE id = ? AND username = ?";
    try {
      Bill bill = jdbcTemplate.queryForObject(sql, billRowMapper(), billId, username);
      return Optional.of(bill);
    } catch (EmptyResultDataAccessException e) {
      return Optional.empty();
    }
  }

  @Override
  public Integer updateStatusForBillById(Integer billId, String status) {
    String sql = "UPDATE bill SET status = ? WHERE id = ?";
    return jdbcTemplate.update(sql, status, billId);
  }

    @Override
    public List<Bill> getListBillByIntervalCreatedTimeAndUsername(String fromTime, String toTime, String username) {
        String sql = "SELECT id, username, created_time, receiver, address, phone_number, status " +
                "FROM bill WHERE username = ? AND created_time BETWEEN STR_TO_DATE(?, '%d-%m-%Y') AND STR_TO_DATE(?, '%d-%m-%Y')";
        System.out.println(sql);
        return jdbcTemplate.query(sql, billRowMapper(), username, fromTime, toTime);
    }

    public static RowMapper<Bill> billRowMapper() {
        return (ResultSet resultSet, int rowNum) -> {
            Bill bill = new Bill();
            bill.setId(resultSet.getInt("id"));
            bill.setUsername(resultSet.getString("username"));
            bill.setCreatedTime(resultSet.getString("created_time"));
            bill.setReceiver(resultSet.getString("receiver"));
            bill.setAddress(resultSet.getString("address"));
            bill.setPhoneNumber(resultSet.getString("phone_number"));
            bill.setStatus(resultSet.getString("status"));
            return bill;
        };
    }
}
