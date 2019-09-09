package com.nal.ecommerge.manager.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author duynv
 * @version 1.0
 */
@ResponseStatus(value = HttpStatus.CONFLICT)
public class FileStorageException extends RuntimeException {
    public FileStorageException(String message) {
        super(message);
    }
}