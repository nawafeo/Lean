package com.github.nawafeo.Lean.dao;

import com.github.nawafeo.Lean.model.Health;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HealthRepository extends MongoRepository<Health, String> {

    Health findByPersonUserId(String id);
}
