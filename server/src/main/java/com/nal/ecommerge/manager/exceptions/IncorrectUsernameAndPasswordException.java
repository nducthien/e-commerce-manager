package com.nal.ecommerge.manager.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author duynv
 * @version 1.0
 */
@ResponseStatus(HttpStatus.FORBIDDEN)
public class IncorrectUsernameAndPasswordException extends RuntimeException {

    public IncorrectUsernameAndPasswordException(String message) {
        super(message);
    }

}
