package Catalogo.FitCompras.FitCompras.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(FaqNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleFaqNotFound(FaqNotFoundException ex) {
        return ex.getMessage();
    }
}