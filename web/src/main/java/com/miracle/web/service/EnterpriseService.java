package com.miracle.web.service;

import com.miracle.web.domain.Enterprise;
import com.miracle.web.mapper.EnterpriseMapper;
import com.miracle.web.utils.BaseService;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.weekend.WeekendSqls;

@Service
public class EnterpriseService extends BaseService<Enterprise>{

    @Autowired
    EnterpriseMapper enterpriseMapper;

    @Override
    protected EnterpriseMapper getMapper() {
        return enterpriseMapper;
    }

    public Enterprise selectByUid(Integer uid){
        val example= Example.builder(Enterprise.class)
                .where(WeekendSqls.custom().andEqualTo("uid",uid))
                .build();

        return enterpriseMapper.selectOneByExample(example);
    }
}
