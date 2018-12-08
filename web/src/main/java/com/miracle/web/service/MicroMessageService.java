package com.miracle.web.service;

import com.miracle.web.domain.MicroMessage;
import com.miracle.web.mapper.MicroMessageMapper;
import com.miracle.web.utils.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MicroMessageService extends BaseService<MicroMessage>{

    @Autowired
    MicroMessageMapper microMessageMapper;

    @Override
    protected MicroMessageMapper getMapper() {
        return microMessageMapper;
    }
}
