package com.nal.ecommerge.manager.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author duynv
 * @version 1.0
 */
@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class ImageNameInvalidException extends RuntimeException {
    public ImageNameInvalidException(String message) {
        super(message);
    }
}