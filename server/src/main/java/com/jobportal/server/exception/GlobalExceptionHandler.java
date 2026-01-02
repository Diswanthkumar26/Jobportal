// // server/src/main/java/com/jobportal/server/exception/GlobalExceptionHandler.java
// package com.jobportal.server.exception;

// import jakarta.validation.ConstraintViolationException;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.validation.FieldError;
// import org.springframework.web.bind.MethodArgumentNotValidException;
// import org.springframework.web.bind.annotation.ControllerAdvice;
// import org.springframework.web.bind.annotation.ExceptionHandler;

// import java.util.HashMap;
// import java.util.Map;

// @ControllerAdvice
// public class GlobalExceptionHandler {

//     @ExceptionHandler(MethodArgumentNotValidException.class)
//     public ResponseEntity<Map<String, String>> handleMethodArgumentNotValid(
//             MethodArgumentNotValidException ex) {
//         Map<String, String> errors = new HashMap<>();
//         for (FieldError fe : ex.getBindingResult().getFieldErrors()) {
//             errors.put(fe.getField(), fe.getDefaultMessage());
//         }
//         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
//     }

//     @ExceptionHandler(ConstraintViolationException.class)
//     public ResponseEntity<Map<String, String>> handleConstraintViolation(
//             ConstraintViolationException ex) {
//         Map<String, String> errors = new HashMap<>();
//         ex.getConstraintViolations().forEach(v ->
//                 errors.put(v.getPropertyPath().toString(), v.getMessage())
//         );
//         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
//     }
// }
