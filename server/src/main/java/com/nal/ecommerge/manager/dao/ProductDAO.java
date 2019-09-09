package com.nal.ecommerge.manager.dao;
import com.nal.ecommerge.manager.models.Product;
import com.nal.ecommerge.manager.repositories.ProductRepository;
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
public class ProductDAO implements ProductRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;
    /**
     * @author thangth
     * @version 1.0
     */
    @Override
    public Optional<Product> findProductById(Integer id) {
        String sql = "SELECT id, name, price, image, cpu, screen, pin, memory, brand, dateCreated, describle, active " +
                "FROM product " +
                "WHERE id = ?";
        try {
            Product product = jdbcTemplate.queryForObject(sql, productRowMapper(), id);
            return Optional.of(product);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }
    /**
     * @author vunv
     * @version 1.0
     */
    @Override
    public List<Product> getAllProductForAdmin() {
        String sql = "SELECT id, name, price, image, cpu, screen, pin, memory, brand, dateCreated, " +
                "describle, active FROM product ORDER BY dateCreated DESC";
        return jdbcTemplate.query(sql, productRowMapper());
    }
    /**
     * @author khangdm, thangth
     * @version 1.0
     */
    @Override
    public Integer updateProductByIdFromAdmin(Product product, int id) {
        String sql = "UPDATE product SET name= ?, price= ?," +
                " image= ?, cpu= ?, screen= ?, pin= ?, memory= ?  WHERE id = ?";
        Object[] objectUpdate = new Object[]{product.getName(), product.getPrice(),
                product.getImage(), product.getCpu(), product.getScreen(), product.getPin(), product.getMemory(), id};
        return jdbcTemplate.update(sql, objectUpdate);
    }
    /**
     * @author thangth
     * @version 1.0
     */
    @Override
    public Product insertProductFromAdmin(Product product) {
        String sql = "INSERT INTO product(name, price, image, cpu, screen, pin, memory, brand, dateCreated, describle, active)" +
                " VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, product.getName());
            ps.setDouble(2, product.getPrice());
            ps.setString(3, product.getImage());
            ps.setString(4, product.getCpu());
            ps.setString(5, product.getScreen());
            ps.setString(6, product.getPin());
            ps.setString(7, product.getMemory());
            ps.setString(8, product.getBrand());
            ps.setString(9, product.getDateCreated());
            ps.setString(10, product.getDescribe());
            ps.setString(11, product.getActive());
            return ps;
        }, keyHolder);
        Number key = keyHolder.getKey();
        Optional<Product> productOptional = findProductById(key.intValue());
        return productOptional.get();
    }
    /**
     * @author vunv
     * @version 1.0
     */
    @Override
    public Integer setActiveForProduct(String status, Integer id) {
        String sql = "UPDATE product SET active = ? WHERE id= ?;";
        return jdbcTemplate.update(sql, status, id);
    }
    /**
     * @author vunv
     * @version 1.0
     */
    @Override
    public List<Product> getAllProductForUser() {
        String sql = "SELECT id, name, price, image, cpu, screen, pin, memory, brand, dateCreated," +
                "describle, active FROM product WHERE active=? ORDER BY dateCreated DESC, name ASC";
        return jdbcTemplate.query(sql, productRowMapper(), "enable");
    }
    /**
     * @author vunv
     * @version 1.0
     */
    @Override
    public List<Product> findAllProductByBrandAndPrice(String brand, Double priceFrom, Double priceEnd) {
        String sql = "SELECT id, name, price, image, cpu, screen, pin, memory, brand, dateCreated, describle, active " +
                "FROM product " +
                "WHERE active=? and brand=? and  price >= ? and price <= ? ORDER BY dateCreated DESC;";
        return jdbcTemplate.query(sql, productRowMapper(), "enable",
                brand, priceFrom, priceEnd);
    }
    @Override
    public List<Product> findAllProductByBrand(String brand) {
        String sql = "SELECT id, name, price, image, cpu, screen, pin, memory, brand, dateCreated, describle, active " +
                "FROM product " +
                "WHERE active=? and brand=? ORDER BY dateCreated DESC;";
        return jdbcTemplate.query(sql, productRowMapper(), "enable",
                brand);
    }
    @Override
    public List<Product> findAllProductByPrice(Double priceFrom, Double priceEnd) {
        String sql = "SELECT id, name, price, image, cpu, screen, pin, memory, brand, dateCreated, describle, active " +
                "FROM product " +
                "WHERE active=? and  price >= ? and price <= ? ORDER BY dateCreated DESC;";
        return jdbcTemplate.query(sql, productRowMapper(), "enable",
                priceFrom, priceEnd);
    }
    @Override
    public Double findMaxPrice() {
        String sql = "SELECT MAX(price) FROM product";
        return jdbcTemplate.queryForObject(sql, Double.class);
    }
    /**
     * @author thangth
     * @version 1.0
     */
    @Override
    public Product getProductById(Integer id) {
        String sql = " SELECT * FROM product WHERE id=?";
        List<Product> productList = jdbcTemplate.query(sql,
                productRowMapper(), id);
        return productList.isEmpty() ? null : productList.get(0);
    }
    /**
     * @author khangdm
     * @version 1.0
     */
    @Override
    public Integer updateProductById(Product product, Integer id) {
        String sql = "UPDATE `ecommerce_manager`.`product` SET " +
                "`name`=?, `price`=?, `image`=?, " +
                "`cpu`=?, `screen`=?, `pin`=?," +
                " `memory`=?, `dateCreated`=?, " +
                "`describle`=?, `active`=?, " +
                "`brand`=? WHERE `id`=?";
        return jdbcTemplate.update(sql, product.getName(), product.getPrice(),
                product.getImage(), product.getCpu(), product.getScreen(), product.getPin(), product.getMemory(), product.getDateCreated(), product.getDescribe(), product.getActive(), product.getBrand(), id);
    }
    /**
     * @author vunv, thangth, duynv
     * @version 1.0
     */
    public static RowMapper<Product> productRowMapper() {
        return (ResultSet rs, int rowNum) -> {
            Product product = new Product();
            product.setId(rs.getInt("id"));
            product.setName(rs.getString("name"));
            product.setPrice(rs.getDouble("price"));
            product.setImage(rs.getString("image"));
            product.setCpu(rs.getString("cpu"));
            product.setPin(rs.getString("pin"));
            product.setScreen(rs.getString("screen"));
            product.setMemory(rs.getString("memory"));
            product.setBrand(rs.getString("brand"));
            product.setDateCreated(rs.getString("dateCreated"));
            product.setDescribe(rs.getString("describle"));
            product.setActive(rs.getString("active"));
            return product;
        };
    }
}