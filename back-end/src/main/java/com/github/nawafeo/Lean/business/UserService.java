package com.github.nawafeo.Lean.business;

import com.github.nawafeo.Lean.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    void insertUser(User user);
    Boolean userExists(String username);
    String userID(String username);
}

