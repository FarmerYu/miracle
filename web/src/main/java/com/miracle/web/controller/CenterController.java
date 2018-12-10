package com.miracle.web.controller;

import com.miracle.web.domain.User;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpSession;

public class CenterController {

    @Autowired
    private HttpSession session;

    protected User currentUser(){
        val user= (User)session.getAttribute("current_user");
        if(user==null) return new User();

        return user;
    }
}
