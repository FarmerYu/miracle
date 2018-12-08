package com.miracle.web.service;

import com.miracle.web.domain.MicroEnterprise;
import com.miracle.web.mapper.MicroEnterpriseMapper;
import com.miracle.web.utils.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MicroEnterpriseService extends BaseService<MicroEnterprise>{

    @Autowired
    MicroEnterpriseMapper microEnterpriseMapper;

    @Override
    protected MicroEnterpriseMapper getMapper() {
        return microEnterpriseMapper;
    }
}
