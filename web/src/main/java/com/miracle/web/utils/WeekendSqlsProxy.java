package com.miracle.web.utils;

import lombok.val;
import tk.mybatis.mapper.weekend.Fn;
import tk.mybatis.mapper.weekend.WeekendSqls;

public class WeekendSqlsProxy<T> {
    private final WeekendSqls<T> ws;

    public WeekendSqlsProxy(WeekendSqls<T> ws){
        this.ws=ws;
    }

    public static <T> WeekendSqlsProxy<T> custom() {
        val proxy=new WeekendSqlsProxy<T>(WeekendSqls.custom());

        return proxy;
    }

    public WeekendSqls<T> weekendSqls(){
        return this.ws;
    }

    public WeekendSqlsProxy<T> andEqualTo(Fn<T, Object> fn, Object value){
        if(value==null) return this;

        this.ws.andEqualTo(fn,value);
        return this;
    }

    public WeekendSqlsProxy<T> andNotEqualTo(Fn<T, Object> fn, Object value){
        if(value==null) return this;

        this.ws.andNotEqualTo(fn,value);
        return this;
    }

    public WeekendSqlsProxy<T> andIsNotNull(Fn<T, Object> fn){
        this.ws.andIsNotNull(fn);
        return this;
    }

    public WeekendSqlsProxy<T> andIsNull(Fn<T, Object> fn){
        this.ws.andIsNull(fn);
        return this;
    }

    public WeekendSqlsProxy<T> andIsNullOrNot(Fn<T, Object> fn,Boolean isNull){
        if(isNull==null) return this;

        if(isNull) return andIsNull(fn);

        return andIsNotNull(fn);
    }
}

/*class ExampleProxy<T>{
    private final Example.Builder builder;

    public ExampleProxy(Class<T> entityClass){
        builder=Example.builder(entityClass);
    }

    public static <T> ExampleProxy<T> builder(Class<T> entityClass){
        return new ExampleProxy<T>(entityClass);
    }

    public Example build(){
        return builder.build();
    }



    public static class BuilderProxy<T>{

        public BuilderProxy<T> where(){

        }
    }
}*/
