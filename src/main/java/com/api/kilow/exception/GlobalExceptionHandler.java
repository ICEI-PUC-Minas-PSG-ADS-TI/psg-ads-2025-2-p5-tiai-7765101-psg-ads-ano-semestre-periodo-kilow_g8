package com.api.kilow;

import com.api.kilow.dto.exception.ErrorResponseDTO;
import com.api.kilow.dto.exception.FieldErrorDTO;
import com.api.kilow.exception.RulesException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseDTO> handleValidationErrors(MethodArgumentNotValidException exception){
        List<FieldErrorDTO> errors = exception.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> new FieldErrorDTO(error.getField(), error.getDefaultMessage()))
                .toList();
        return buildResponse(HttpStatus.BAD_REQUEST, "Erro de Validação de Dados", errors);

    }

    @ExceptionHandler(RulesException.class)
    public ResponseEntity<ErrorResponseDTO> handleRegraNegocio(RulesException exception) {
        List<FieldErrorDTO> erros = List.of(new FieldErrorDTO("regra", exception.getMessage()));
        return buildResponse(HttpStatus.BAD_REQUEST, "Erro de Regra de Negócio", erros);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDTO> handleUnexpectedBugs(Exception exception) {
        exception.printStackTrace();

        List<FieldErrorDTO> erros = List.of(new FieldErrorDTO("servidor", "Ocorreu um erro inesperado no servidor. Tente novamente mais tarde."));
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Erro Interno do Servidor", erros);
    }

    private ResponseEntity<ErrorResponseDTO> buildResponse(HttpStatus status, String title, List<FieldErrorDTO> error) {
        ErrorResponseDTO response = new ErrorResponseDTO(
                LocalDateTime.now(),
                status.value(),
                title,
                error
        );
        return ResponseEntity.status(status).body(response);
    }
}

