package com.nal.ecommerge.manager.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author duynv
 * @version 1.0
 */
public class CreateStorageImagesException extends RuntimeException {
    public CreateStorageImagesException(String message, Exception exception) {
        super(message);
    }
}
