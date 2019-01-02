package com.miracle.web.domain.value;

import lombok.Getter;

public enum OrganizationType {
    Enterprise(2,"企业"),Provider(3,"组织");

    @Getter
    private String description;

    @Getter
    private int code;


    private OrganizationType(int code, String description){
        this.description=description;
        this.code=code;
    }

    public static OrderPayStatus valueOf(int code){
        for (OrderPayStatus value : OrderPayStatus.values()) {
            if(value.getCode()==code) return  value;
        }
        return null;
    }

    @Override
    public String toString() {
        return Integer.toString( this.code);
    }
}
