package com.miracle.web.service;

import com.miracle.web.domain.MicroService;
import com.miracle.web.mapper.MicroServiceMapper;
import com.miracle.web.utils.BaseMapper;
import com.miracle.web.utils.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MicroServiceService extends BaseService<MicroService> {

    @Autowired
    MicroServiceMapper microServiceMapper;

    @Override
    protected BaseMapper<MicroService> getMapper() {
        return microServiceMapper;
    }
}
