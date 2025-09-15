package com.example.exception.handler;

import com.example.exception.model.*;
import com.google.common.collect.Lists;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Date;
import java.util.List;

@ControllerAdvice
public class CustomExceptionHandler {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @ExceptionHandler({CustomTestException.class})
    protected ResponseEntity<Object> handleCustomTestException(HttpServletRequest httpServletRequest, CustomTestException customTestException) {
        this.logger.error(customTestException.getMessage(), customTestException);
        return buildCustomHttpResponseEntity(httpServletRequest.getRequestURI(), customTestException.getStatus(), customTestException.getMessage(), ErrorCode.CUSTOM_TEST_EXCEPTION);
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    protected ResponseEntity<Object> handleMethodArgumentNotValidException(HttpServletRequest httpServletRequest, MethodArgumentNotValidException methodArgumentNotValidException) {
        this.logger.error(methodArgumentNotValidException.getMessage(), methodArgumentNotValidException);
        List<String> objectErrorMessages = methodArgumentNotValidException.getBindingResult().getGlobalErrors().stream().map(err -> err.getObjectName() + ": " + err.getDefaultMessage()).toList();
        List<String> fieldErrorMessages = methodArgumentNotValidException.getBindingResult().getFieldErrors().stream().map(err -> err.getField() + ": " + err.getDefaultMessage()).toList();
        List<String> errorMessages = Lists.newArrayList();
        errorMessages.addAll(objectErrorMessages);
        errorMessages.addAll(fieldErrorMessages);
        String errorMessage = String.join(", ", errorMessages);
        return buildCustomHttpResponseEntity(httpServletRequest.getRequestURI(), HttpStatus.BAD_REQUEST, errorMessage, ErrorCode.METHOD_ARGUMENT_NOT_VALID_EXCEPTION);
    }

    private ResponseEntity<Object> buildCustomHttpResponseEntity(String requestUri, HttpStatus httpStatus, String message, ErrorCode errorCode) {
        CustomHttpError customHttpError = CustomHttpError.builder()
                .timestamp(new Date()).status(httpStatus.value())
                .error(httpStatus.getReasonPhrase())
                .path(requestUri)
                .customError(new ErrorDetails(errorCode, message)).build();
        return ResponseEntity.status(httpStatus.value()).body(customHttpError);
    }
}
