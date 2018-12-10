package com.miracle.web.service;

import com.miracle.web.domain.Provider;
import com.miracle.web.mapper.ProviderMapper;
import com.miracle.web.utils.BaseMapper;
import com.miracle.web.utils.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProviderService extends BaseService<Provider> {
    @Autowired
    ProviderMapper providerMapper;
    @Override
    protected BaseMapper<Provider> getMapper() {
        return providerMapper;
    }
}
