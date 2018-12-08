package com.miracle.web.domain;

import lombok.Getter;

public enum MicroOrderPayStatus {
    Paying(0,"待付款"),
    Paid(1,"支付成功"),
    Canceled(-1,"已取消");

    @Getter
    private String description;

    @Getter
    private int code;


    private MicroOrderPayStatus(int code,String description){
        this.description=description;
        this.code=code;
    }

    public static MicroOrderPayStatus valueOf(int code){
        for (MicroOrderPayStatus value : MicroOrderPayStatus.values()) {
            if(value.getCode()==code) return  value;
        }
        return null;
    }

    @Override
    public String toString() {
        return Integer.toString( this.code);
    }
}
