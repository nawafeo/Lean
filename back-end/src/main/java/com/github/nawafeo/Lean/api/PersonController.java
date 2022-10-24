package com.github.nawafeo.Lean.api;

import com.github.nawafeo.Lean.business.PersonService;
import com.github.nawafeo.Lean.business.UserService;
import com.github.nawafeo.Lean.model.Person;
import com.github.nawafeo.Lean.model.Sex;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/person")
public class PersonController {

    private final PersonService personService;
    private final UserService userService;

    private PersonController(PersonService personService, UserService userService) {
        this.personService = personService;
        this.userService = userService;
    }

    @PostMapping("/get")
    public static Person getPerson(String name, String sex, int age, int feet, int inches, int weight,
                                   int bodyFatPercentage) {
        Person person = new Person(null, name);
        if (sex.equals("male")) {
            person.setSex(Sex.MALE);
        } else {
            person.setSex(Sex.FEMALE);
        }
        person.setAge(age);
        person.setWeight(weight);
        person.setHeight(feet * 12 + inches);
        if (bodyFatPercentage == 0) {
            person.setBodyFatPercentage(null);
        } else {
            person.setBodyFatPercentage(bodyFatPercentage);
        }
        return person;
    }

    @PostMapping("/create")
    private void createPerson(@RequestParam (name = "name") String name,
                              @RequestParam (name = "username") String username) {
        personService.insertPerson(new Person(userService.userID(username.toLowerCase()), name));
    }

    @PostMapping("/update/sex")
    private void updatePersonSex(@RequestParam (name = "sex") String sex,
                                 @RequestParam (name = "username") String username) {
        Person person = personService.getPerson(userService.userID(username.toLowerCase()));
        if (sex.equals("male")) {
            person.setSex(Sex.MALE);
        } else {
            person.setSex(Sex.FEMALE);
        }
        personService.updatePerson(person);
    }

    @PostMapping("/update/age")
    private void updatePersonAge(@RequestParam (name = "age") int age,
                                 @RequestParam (name = "username") String username) {
        Person person = personService.getPerson(userService.userID(username.toLowerCase()));
        person.setAge(age);
        personService.updatePerson(person);
    }

    @PostMapping("/update/height")
    private void updatePersonHeight(@RequestParam (name = "feet") int feet, @RequestParam (name = "inches") int inches,
                                    @RequestParam (name = "username") String username) {
        Person person = personService.getPerson(userService.userID(username.toLowerCase()));
        person.setHeight(feet * 12 + inches);
        personService.updatePerson(person);
    }

    @PostMapping("/update/weight")
    private void updatePersonWeight(@RequestParam (name = "weight") int weight,
                                    @RequestParam (name = "username") String username) {
        Person person = personService.getPerson(userService.userID(username.toLowerCase()));
        person.setWeight(weight);
        personService.updatePerson(person);
    }

    @PostMapping("/update/BFP")
    private void updatePersonBFP(@RequestParam (name = "bodyFatPercentage") int bodyFatPercentage,
                                 @RequestParam (name = "username") String username) {
        Person person = personService.getPerson(userService.userID(username.toLowerCase()));
        if (bodyFatPercentage == 0) {
            person.setBodyFatPercentage(null);
        } else {
            person.setBodyFatPercentage(bodyFatPercentage);
        }
        personService.updatePerson(person);
    }
}
