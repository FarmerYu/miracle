package com.miracle.web.service;

import com.miracle.web.domain.Service;
import com.miracle.web.mapper.ServiceMapper;
import com.miracle.web.utils.BaseMapper;
import com.miracle.web.utils.BaseService;
import org.springframework.beans.factory.annotation.Autowired;

@org.springframework.stereotype.Service
public class ServiceService extends BaseService<Service> {

    @Autowired
    ServiceMapper serviceMapper;

    @Override
    protected BaseMapper<Service> getMapper() {
        return serviceMapper;
    }
}
