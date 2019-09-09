package com.nal.ecommerge.manager.dao;

import com.nal.ecommerge.manager.repositories.UserRepository;
import com.nal.ecommerge.manager.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

/**
 * @author duynv, vunv, thangth, hungpn
 * @version 1.0
 */
@Repository
public class UserDAO implements UserRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    /*
     * @author
     */
    @Override
    public Optional<User> findUserByUsername(String username) {
        String sql = "SELECT id, username, password, first_name, last_name, address " +
                "FROM user " +
                "WHERE username = ? AND active = 'enable'";
        try {
            User user = jdbcTemplate.queryForObject(sql, userRowMapper(), username);
            return Optional.of(user);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    @Override
    public List<User> getUsers() {
        String sql = "SELECT id, username, password, first_name, last_name, role, address FROM user " +
                "WHERE role = 0 AND active = 'enable' ORDER BY username";
        RowMapper<User> rowMapper = new GetAllUserRowMapper();
        return jdbcTemplate.query(sql, rowMapper);
    }

    public User findUserByUsernameAndPassword(String username, String password) {
        String sql = "SELECT id, username, role FROM user " +
                "WHERE username = ? AND password = ? AND active = 'enable'";
        UserLoginMapper userLoginMapper = new UserLoginMapper();
        User user = (User) jdbcTemplate.queryForObject(sql, userLoginMapper, username, password);

        return user;
    }

    @Override
    public Integer registerUser(User user) {
        String sql = "INSERT INTO user(username, password, first_name, last_name, role, address, active)" +
                " VALUE (?,?,?,?,?,?,?)";
        return jdbcTemplate.update(sql, user.getUsername(), user.getPassword(),
                user.getFirstName(), user.getLastName(), 0, user.getAddress(), "enable");
    }

    @Override
    public User getUserByUsername(String username) {
        String sql = "SELECT id, username, password, first_name, last_name, role, address " +
                "FROM user WHERE username = ?";
        GetAllUserRowMapper userMapper = new GetAllUserRowMapper();
        User user = (User) jdbcTemplate.queryForObject(sql, userMapper, username);
        return user;
    }

    @Override
    public Integer deleteUserById(int id) {
        String sql = "UPDATE user SET active = 'disable' WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }

    public User insertUserFromAdmin(User user) {
        String sql;
        Object[] attributes;
        try {
            getUserByUsername(user.getUsername());
            sql = "UPDATE user SET password = ?, first_name = ?, last_name = ?, role = ?, " +
                    "address = ?, active = ? " +
                    "WHERE username = ?";
            attributes = new Object[]{user.getPassword(), user.getFirstName(),
                    user.getLastName(), 0, user.getAddress(), "enable", user.getUsername()};
            jdbcTemplate.update(sql, attributes);
        } catch (EmptyResultDataAccessException e) {
            sql = "INSERT INTO user(username, password, first_name, last_name, role, address, active)" +
                    " VALUES(?, ?, ?, ?, ?, ?, ?)";
            attributes = new Object[]{user.getUsername(), user.getPassword(), user.getFirstName(),
                    user.getLastName(), 0, user.getAddress(), "enable"};
            jdbcTemplate.update(sql, attributes);
        }

        return getUserByUsername(user.getUsername());
    }



    @Override
    public Integer updateUserByIdFromAdmin(User user, int id) {
        String sql = "UPDATE user SET password= ?, first_name= ?," +
                " last_name= ?, role= ?, address= ? WHERE id = ?";
        Object[] objectUpdate = new Object[]{user.getPassword(), user.getFirstName(),
                user.getLastName(), 0, user.getAddress(), id};
        return jdbcTemplate.update(sql, objectUpdate);
    }

    class UserLoginMapper implements RowMapper {

        @Override
        public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
            User userMapper = new User();
            userMapper.setId(rs.getInt("id"));
            userMapper.setUsername(rs.getString("username"));
            userMapper.setRole(rs.getInt("role"));
            return userMapper;
        }
    }

    @Override
    public Integer updateUserByIdButNotChangePasswordFromAdmin(User user, int id) {
        String sql = "UPDATE user SET first_name= ?," +
                " last_name= ?, role= ?, address= ? WHERE id = ?";
        Object[] objectUpdate = new Object[]{user.getFirstName(),
                user.getLastName(), 0, user.getAddress(), id};
        return jdbcTemplate.update(sql, objectUpdate);
    }

    @Override
    public User findUserById(int id) {
        return null;
    }

    public static RowMapper<User> userRowMapper() {
        return (ResultSet resultSet, int rowNum) -> {
            User user = new User();
            user.setId(resultSet.getInt("id"));
            user.setUsername(resultSet.getString("username"));
            user.setPassword(resultSet.getString("password"));
            user.setFirstName(resultSet.getString("first_name"));
            user.setFirstName(resultSet.getString("first_name"));
            user.setAddress(resultSet.getString("address"));
            return user;
        };
    }

    public class GetAllUserRowMapper implements RowMapper {
        @Override
        public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
            User user = new User();
            user.setId(rs.getInt("id"));
            user.setUsername(rs.getString("username"));
            user.setPassword(rs.getString("password"));
            user.setFirstName(rs.getString("first_name"));
            user.setLastName(rs.getString("last_name"));
            user.setRole(rs.getInt("role"));
            user.setAddress(rs.getString("address"));
            return user;
        }
    }

}
