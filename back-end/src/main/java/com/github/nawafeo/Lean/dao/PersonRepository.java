package com.github.nawafeo.Lean.dao;

import com.github.nawafeo.Lean.model.Person;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends MongoRepository<Person, String> {

    Person findByUserId(String id);
}
