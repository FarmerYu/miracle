package com.miracle.web.service;

import com.miracle.web.domain.OrgMember;
import com.miracle.web.domain.User;
import com.miracle.web.mapper.OrgMemberMapper;
import com.miracle.web.mapper.UserMapper;
import com.miracle.web.utils.BaseMapper;
import com.miracle.web.utils.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrgMemberService extends BaseService<OrgMember> {
    @Autowired
    OrgMemberMapper orgMemberMapper;

    @Override
    protected BaseMapper<OrgMember> getMapper() {
        return orgMemberMapper;
    }


}
