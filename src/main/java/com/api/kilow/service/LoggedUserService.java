package com.api.kilow.service;

import com.api.kilow.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class LoggedUserService {
  @Autowired UserService userService;

  public Long getUserId() {
    return getUser().getId();
  }

  public User getUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null || !authentication.isAuthenticated()) {
      throw new RuntimeException("Usuário não autenticado.");
    }
    Object principal = authentication.getPrincipal();

    if (principal instanceof User loggedUser) {
      return loggedUser;
    }

    throw new RuntimeException("Erro interno: O principal não é do tipo User.");
  }
}
