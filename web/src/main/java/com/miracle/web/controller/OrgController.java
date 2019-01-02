package com.miracle.web.controller;

import com.github.pagehelper.PageHelper;
import com.miracle.web.domain.Message;
import com.miracle.web.domain.OrgMember;
import com.miracle.web.service.MessageService;
import com.miracle.web.service.OrgMemberService;
import com.miracle.web.service.OrganizationService;
import com.miracle.web.utils.WeekendSqlsProxy;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import tk.mybatis.mapper.entity.Example;

@Controller
@RequestMapping("/org")
public class OrgController extends CenterController {

    @Autowired
    OrganizationService organizationService;
    @Autowired
    OrgMemberService orgMemberService;

    @RequestMapping("/index")
    public ModelAndView index(@RequestParam(defaultValue = "1") Integer pageNum, @RequestParam(defaultValue = "1") Integer own){

        val example= Example.builder(OrgMember.class)
                .where(WeekendSqlsProxy.<OrgMember>custom()
                        .andEqualTo(OrgMember::getUid,currentUser().getUid())
                        .weekendSqls())
                .orderByDesc("createTime")
                .build();

        val page= PageHelper.startPage(pageNum,8).doSelectPage(()-> orgMemberService.selectByExample(example));

        return  new ModelAndView("center/enterprise/org","page",page);
    }


}
