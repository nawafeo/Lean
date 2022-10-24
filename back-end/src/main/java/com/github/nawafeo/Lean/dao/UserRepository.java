package com.github.nawafeo.Lean.dao;

import com.github.nawafeo.Lean.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    User findByUsername(String username);
    Boolean existsByUsername(String username);
}
