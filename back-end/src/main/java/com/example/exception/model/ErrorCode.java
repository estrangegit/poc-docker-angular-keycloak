package com.example.exception.model;

public enum ErrorCode {
    METHOD_ARGUMENT_NOT_VALID_EXCEPTION(1),
    CUSTOM_TEST_EXCEPTION(2);

    private Integer code;

    ErrorCode(Integer code) {
        this.code = code;
    }

    public Integer getCode() {
        return this.code;
    }
}
