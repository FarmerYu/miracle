package com.miracle.web.service;

import com.miracle.web.domain.Enterprise;
import com.miracle.web.mapper.EnterpriseMapper;
import com.miracle.web.utils.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnterpriseService extends BaseService<Enterprise>{

    @Autowired
    EnterpriseMapper enterpriseMapper;

    @Override
    protected EnterpriseMapper getMapper() {
        return enterpriseMapper;
    }
}
