package com.miracle.web.domain;

import lombok.Data;
import lombok.Getter;


public class BaseDomain implements IsDefault {

    private boolean isDefault;

    @Override
    public boolean isDefault() {
        return isDefault;
    }

    @Override
    public void isDefault(boolean isDefault) {
        this.isDefault=isDefault;
    }
}
