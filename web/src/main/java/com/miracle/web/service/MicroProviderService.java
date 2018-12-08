package com.miracle.web.service;

import com.miracle.web.domain.MicroProvider;
import com.miracle.web.mapper.MicroProviderMapper;
import com.miracle.web.utils.BaseMapper;
import com.miracle.web.utils.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MicroProviderService extends BaseService<MicroProvider> {
    @Autowired
    MicroProviderMapper microProviderMapper;
    @Override
    protected BaseMapper<MicroProvider> getMapper() {
        return microProviderMapper;
    }
}
