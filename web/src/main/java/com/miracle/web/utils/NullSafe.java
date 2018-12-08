package com.miracle.web.utils;

public class NullSafe {

    public static <T> T ensureNotNull(T obj, Class<T> cls) {
        if (obj == null) {
            try {
                return (T) cls.newInstance();
            } catch (Exception ex) {
                return null;
            }
        }

        return obj;
    }
}
