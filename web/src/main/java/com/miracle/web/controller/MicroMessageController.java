package com.miracle.web.controller;

import com.github.pagehelper.PageHelper;
import com.miracle.web.domain.MicroMessage;
import com.miracle.web.service.MicroMessageService;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.weekend.WeekendSqls;

@Controller
@RequestMapping("/message")
public class MicroMessageController {

    @Autowired
    MicroMessageService microMessageService;


    @RequestMapping("/index")
    public ModelAndView index(@RequestParam(defaultValue = "1") Integer pageNum, @RequestParam(defaultValue = "0") Integer isRead){
        val example= Example.builder(MicroMessage.class)
                .where(WeekendSqls.<MicroMessage>custom().andEqualTo(MicroMessage::getIsRead,isRead))
                .orderByDesc("id")
                .build();

        val page= PageHelper.startPage(pageNum,8).doSelectPage(()->microMessageService.selectByExample(example));

        return  new ModelAndView("center/message","page",page);
    }


}
