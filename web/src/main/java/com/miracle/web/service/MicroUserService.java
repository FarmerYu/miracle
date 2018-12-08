package com.miracle.web.service;

import com.miracle.web.domain.MicroUser;
import com.miracle.web.mapper.MicroUserMapper;
import com.miracle.web.utils.BaseMapper;
import com.miracle.web.utils.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MicroUserService extends BaseService<MicroUser> {
    @Autowired
    MicroUserMapper microUserMapper;

    @Override
    protected BaseMapper<MicroUser> getMapper() {
        return microUserMapper;
    }
}
