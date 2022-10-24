package com.github.nawafeo.Lean.business;

import com.github.nawafeo.Lean.dao.PersonRepository;
import com.github.nawafeo.Lean.model.Person;
import org.springframework.stereotype.Service;

@Service
public class PersonServiceImpl implements PersonService {

    private final PersonRepository personRepository;

    public PersonServiceImpl(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @Override
    public void insertPerson(Person person) {
        Person p = personRepository.findByUserId(person.getUserId());
        if (p == null) {
            personRepository.insert(person);
        } else {
            p.setName(person.getName());
            personRepository.save(p);
        }
    }

    @Override
    public Person getPerson(String id) {
        return personRepository.findByUserId(id);
    }

    @Override
    public void updatePerson(Person person) {
        personRepository.save(person);
    }
}
