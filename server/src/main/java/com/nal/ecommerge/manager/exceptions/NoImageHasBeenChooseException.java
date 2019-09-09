package com.nal.ecommerge.manager.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author duynv
 * @version 1.0
 */
@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class NoImageHasBeenChooseException extends RuntimeException {
    public NoImageHasBeenChooseException(String message) {
        super((message));
    }
}
