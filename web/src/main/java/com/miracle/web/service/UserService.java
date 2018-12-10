package com.miracle.web.service;

import com.miracle.web.domain.User;
import com.miracle.web.mapper.UserMapper;
import com.miracle.web.utils.BaseMapper;
import com.miracle.web.utils.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService extends BaseService<User> {
    @Autowired
    UserMapper userMapper;

    @Override
    protected BaseMapper<User> getMapper() {
        return userMapper;
    }
}
