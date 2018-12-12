package com.miracle.web.controller;

import com.github.pagehelper.PageHelper;
import com.miracle.web.domain.Message;
import com.miracle.web.service.MessageService;
import com.miracle.web.utils.WeekendSqlsProxy;
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
public class MessageController extends CenterController {

    @Autowired
    MessageService messageService;

    @RequestMapping("/index")
    public ModelAndView index(@RequestParam(defaultValue = "1") Integer pageNum, @RequestParam(defaultValue = "0") Integer isRead){
        val example= Example.builder(Message.class)
                .where(WeekendSqlsProxy.<Message>custom()
                        .andEqualTo(Message::getIsRead,isRead)
                        .andEqualTo(Message::getRecuid,currentUser().getUid())
                        .weekendSqls())
                .orderByDesc("id")
                .orderBy("isRead")
                .build();

        val page= PageHelper.startPage(pageNum,8).doSelectPage(()-> messageService.selectByExample(example));

        return  new ModelAndView("center/message","page",page);
    }


}
