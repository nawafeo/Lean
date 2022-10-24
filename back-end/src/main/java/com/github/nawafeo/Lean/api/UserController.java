package com.github.nawafeo.Lean.api;

import com.github.nawafeo.Lean.business.UserService;
import com.github.nawafeo.Lean.model.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    private UserController(UserService userService, AuthenticationManager authenticationManager,
                           PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/create")
    private void createUser(@RequestParam (name = "username") String username,
                            @RequestParam (name = "password") String password) {
        userService.insertUser(new User(username.toLowerCase(), passwordEncoder.encode(password)));
    }

    @PostMapping("/authenticate")
    private String authenticateUser(@RequestParam (name = "username") String username,
                                    @RequestParam (name = "password") String password) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username.toLowerCase(), password));
        } catch (Exception e) {
            return null;
        }
        return username;
    }

    @PostMapping("/exists")
    private Boolean checkUserExists(@RequestParam (name = "username") String username) {
        return userService.userExists(username.toLowerCase());
    }
}
