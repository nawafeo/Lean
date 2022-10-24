package com.github.nawafeo.Lean.business;

import com.github.nawafeo.Lean.model.Person;

public interface PersonService {

    void insertPerson(Person person);
    Person getPerson(String id);
    void updatePerson(Person person);
}
