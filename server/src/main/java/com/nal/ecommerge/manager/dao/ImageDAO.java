package com.nal.ecommerge.manager.dao;

import com.nal.ecommerge.manager.repositories.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 * @author duynv
 * @version 1.0
 */
@Repository
public class ImageDAO implements ImageRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public String getImageName() {
        return null;
    }

    /**
     * @author duynv
     * @version 1.0
     */
    @Override
    public Integer saveImageNameByProductId(String imageName, String productId) {
        String sql = "UPDATE product SET image = ? WHERE id = ?";
        return jdbcTemplate.update(sql, imageName, productId);
    }

    @Override
    public String deleteImageName() {
        return null;
    }
}
