package com.miracle.web.service;

import com.miracle.web.domain.Message;
import com.miracle.web.mapper.MessageMapper;
import com.miracle.web.utils.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageService extends BaseService<Message>{

    @Autowired
    MessageMapper messageMapper;

    @Override
    protected MessageMapper getMapper() {
        return messageMapper;
    }
}
