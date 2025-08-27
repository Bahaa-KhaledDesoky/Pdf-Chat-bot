package com.example.Pdf_Chat_bot.exception;

import com.example.Pdf_Chat_bot.service.OcrException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<?> handleUserNotFoundException(UserNotFoundException ex, WebRequest request) {
        Map<String,String> errorDetails = new HashMap<>();
        errorDetails.put("HttpStatus",""+HttpStatus.NOT_FOUND.value());
        errorDetails.put("Message", ex.getMessage());
        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(PdfReadingException.class)
    public ResponseEntity<?> handleUserNotFoundException(PdfReadingException ex, WebRequest request) {
        Map<String,String> errorDetails = new HashMap<>();
        errorDetails.put("HttpStatus",""+HttpStatus.BAD_REQUEST.value());
        errorDetails.put("Message", ex.getMessage());
        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(FileExistExeption.class)
    public ResponseEntity<?> handleFileExistExeption(FileExistExeption ex, WebRequest request) {
        Map<String,String> errorDetails = new HashMap<>();
        errorDetails.put("HttpStatus",""+HttpStatus.BAD_REQUEST.value());
        errorDetails.put("Message", ex.getMessage());
        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(OcrException.class)
    public ResponseEntity<?> handleOcrException(OcrException ex, WebRequest request) {
        Map<String,String> errorDetails = new HashMap<>();
        errorDetails.put("HttpStatus",""+HttpStatus.UNPROCESSABLE_ENTITY.value());
        errorDetails.put("Message", ex.getMessage());
        return new ResponseEntity<>(errorDetails, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  @ExceptionHandler(UserExistExciption.class)
    public ResponseEntity<?> handleUserExistExciption(UserExistExciption ex, WebRequest request) {
        Map<String,String> errorDetails = new HashMap<>();
        errorDetails.put("HttpStatus",""+HttpStatus.BAD_REQUEST.value());
        errorDetails.put("Message", ex.getMessage());
        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

}
