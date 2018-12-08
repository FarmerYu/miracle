package com.miracle.web;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import tk.mybatis.spring.annotation.MapperScan;

@MapperScan(basePackages = "com.miracle.web.mapper")
@SpringBootApplication
public class UiApplication {

    public static void main(String[] args) {
        SpringApplication.run(UiApplication.class, args);
        System.err.println("ヾ(◍°∇°◍)ﾉﾞ    Ui启动成功      ヾ(◍°∇°◍)ﾉﾞ\n");
    }
}
