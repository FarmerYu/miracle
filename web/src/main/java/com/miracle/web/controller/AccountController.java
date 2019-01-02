package com.miracle.web.controller;

import com.github.pagehelper.PageHelper;
import com.miracle.web.domain.Message;
import com.miracle.web.dto.ModifyPwdDto;
import com.miracle.web.service.MessageService;
import com.miracle.web.utils.WeekendSqlsProxy;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import tk.mybatis.mapper.entity.Example;

import javax.validation.Valid;

@Controller
@RequestMapping("/account")
public class AccountController extends CenterController {

    @Autowired
    MessageService messageService;

    @GetMapping("/pwd")
    public ModelAndView getPwd() {

        return new ModelAndView("center/modify-pwd", "dto", new ModifyPwdDto());
    }

    @PostMapping("/pwd")
    //@RequestMapping(value = "/pwd" ,method = RequestMethod.POST)
    public String updatePwd(@Valid @ModelAttribute(name = "dto") ModifyPwdDto dto,BindingResult br) {

        if(br.hasErrors()) {
        return "center/modify-pwd";
        }

        return "center/modify-pwd-success";
        //return new ModelAndView("center/modify-pwd", "dto", dto);
    }

}
