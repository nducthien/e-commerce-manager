package com.nal.ecommerge.manager.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author duynv
 * @version 1.0
 */
@ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
public class NullArgumentsException extends RuntimeException {
    public NullArgumentsException(String message) {
        super(message);
    }
}
