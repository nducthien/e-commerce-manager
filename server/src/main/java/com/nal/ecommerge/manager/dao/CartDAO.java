package com.nal.ecommerge.manager.dao;

import com.nal.ecommerge.manager.models.Cart;
import com.nal.ecommerge.manager.repositories.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.util.List;
import java.util.Optional;

/**
 * @author anhnt2
 * @version 1.0
 */
@Repository
public class CartDAO implements CartRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public List<Cart> getCartInfoByUserId(String username) {
        String sql = "SELECT id, username, product_id, status, quantity " +
                "FROM cart WHERE status = 'enable' AND username = ?";
        return jdbcTemplate.query(sql, cartRowMapper(), username);
    }

    /**
     * @return
     * @author khangdm
     * @version 1.0
     */
    @Override
    public Cart getByUserNameAndProductId(String username, int ProductId) {
        String sql = "SELECT id, username,product_id,status,quantity" +
                " FROM cart WHERE username=? AND product_id=?";
        try {
            Cart cart = this.jdbcTemplate.queryForObject(sql, cartRowMapper(), username, ProductId);
            return cart;
        } catch (EmptyResultDataAccessException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * @return
     * @author khangdm
     * @version 1.0
     */
    @Override
    public Cart insert(Cart cart) {
        String sql = "INSERT INTO cart (username,product_id,status,quantity) " +
                "VALUES(?,?,?,?)";
        try {
            Object[] listParam = {cart.getUsername(), cart.getProductId(), "enable", cart.getQuantity()};
            this.jdbcTemplate.update(sql, listParam);
            return this.getByUserNameAndProductId(cart.getUsername(), cart.getProductId());
        } catch (EmptyResultDataAccessException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * @return
     * @author khangdm
     * @version 1.0
     */
    @Override
    public int updateQuantity(Cart cart) {
        String sql = "UPDATE `ecommerce_manager`.`cart` SET `quantity`=`quantity`+ ?, status=? WHERE `username`=? and`product_id`=?";
        return this.jdbcTemplate.update(sql,cart.getQuantity() , "enable", cart.getUsername(), cart.getProductId());
    }

    @Override
    public Integer disableProductFromCart(Integer id) {
        String sql = "UPDATE cart SET status = 'disable', quantity=0 WHERE id = ?";
        return this.jdbcTemplate.update(sql, id);
    }
    /**
     * @return
     * @author khangdm
     * @version 1.0
     */
    public static RowMapper<Cart> cartRowMapper() {
        return (ResultSet rs, int rowNum) -> {
            Cart cart = new Cart();
            cart.setId(rs.getInt("id"));
            cart.setUsername(rs.getString("username"));
            cart.setProductId(rs.getInt("product_id"));
            cart.setStatus(rs.getString("status"));
            cart.setQuantity(rs.getInt("quantity"));
            return cart;
        };
    }
}