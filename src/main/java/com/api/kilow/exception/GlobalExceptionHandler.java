package com.api.kilow;

import com.api.kilow.dto.exception.ErrorResponse;
import com.api.kilow.dto.exception.FieldError;
import com.api.kilow.exception.RulesException;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationErrors(MethodArgumentNotValidException exception){
        List<FieldError> errors = exception.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> new FieldError(error.getField(), error.getDefaultMessage()))
                .toList();
        return buildResponse(HttpStatus.BAD_REQUEST, "Erro de Validação de Dados", errors);

    }

    @ExceptionHandler(RulesException.class)
    public ResponseEntity<ErrorResponse> handleRegraNegocio(RulesException exception) {
        List<FieldError> erros = List.of(new FieldError("regra", exception.getMessage()));
        return buildResponse(HttpStatus.BAD_REQUEST, "Erro de Regra de Negócio", erros);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleUnexpectedBugs(Exception exception) {
        exception.printStackTrace();

        List<FieldError> erros = List.of(new FieldError("servidor", "Ocorreu um erro inesperado no servidor. Tente novamente mais tarde."));
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Erro Interno do Servidor", erros);
    }

    private ResponseEntity<ErrorResponse> buildResponse(HttpStatus status, String title, List<FieldError> error) {
        ErrorResponse response = new ErrorResponse(
                LocalDateTime.now(),
                status.value(),
                title,
                error
        );
        return ResponseEntity.status(status).body(response);
    }
}

