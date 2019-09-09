package com.nal.ecommerge.manager.dao;

import com.nal.ecommerge.manager.repositories.AuthenticationRepository;
import com.nal.ecommerge.manager.models.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author duynv, vunv, thangth, hungpn
 * @version 1.0
 */
@Repository
public class AuthenticationDAO implements AuthenticationRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public int insertAuthentication(Authentication authentication) {
        String sql = "INSERT INTO authentication(user_id, token_string, datetime_created) VALUES(?,?,?)";
        return jdbcTemplate.update(sql, authentication.getUserId(), authentication.getToken(), authentication.getTokenCreatedTime());
    }

    @Override
    public Authentication getAuthenticationById(Integer authenticationId) {
        return null;
    }

    @Override
    public Authentication getAuthenticationByTokenName(String token) {
        String sql = "SELECT id, token_string, datetime_created, user_id FROM authentication " +
                "WHERE token_string = ?";
        AuthenticationMapper authenticationMapper = new AuthenticationMapper();
        Authentication authentication = (Authentication) jdbcTemplate.queryForObject(sql, authenticationMapper, token);
        return authentication;
    }

    class AuthenticationMapper implements RowMapper {

        @Override
        public Authentication mapRow(ResultSet rs, int rowNum) throws SQLException {
            Authentication authentication = new Authentication();
            authentication.setUserId(rs.getInt("id"));
            authentication.setToken(rs.getString("token_string"));
            authentication.setTokenCreatedTime(rs.getString("datetime_created"));
            authentication.setUserId(rs.getInt("user_id"));
            return authentication;
        }
    }
}
