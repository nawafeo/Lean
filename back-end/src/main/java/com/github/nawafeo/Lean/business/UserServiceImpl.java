package com.github.nawafeo.Lean.business;

import com.github.nawafeo.Lean.dao.UserRepository;
import com.github.nawafeo.Lean.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void insertUser(User user) {
        userRepository.insert(user);
    }

    @Override
    public Boolean userExists(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public String userID(String username) {
        return userRepository.findByUsername(username).getId();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return null;
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                user.getAuthorities());
    }
}
