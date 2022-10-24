package com.github.nawafeo.Lean.api;

import com.github.nawafeo.Lean.business.HealthService;
import com.github.nawafeo.Lean.business.PersonService;
import com.github.nawafeo.Lean.business.UserService;
import com.github.nawafeo.Lean.model.*;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/health")
public class HealthController {

    private final HealthService healthService;
    private final PersonService personService;
    private final UserService userService;

    public HealthController(HealthService healthService, PersonService personService, UserService userService) {
        this.healthService = healthService;
        this.personService = personService;
        this.userService = userService;
    }

    @PostMapping("/get")
    public Health getHealth(@RequestParam (name = "name") String name, @RequestParam (name = "sex") String sex,
                            @RequestParam (name = "age") int age, @RequestParam (name = "feet") int feet,
                            @RequestParam (name = "inches") int inches, @RequestParam (name = "weight") int weight,
                            @RequestParam (name = "bodyFatPercentage") int bodyFatPercentage,
                            @RequestParam (name = "activity") int activity) {
        Health health = null;
        switch (activity) {
            case 0 -> health = new Health(PersonController.getPerson(
                    name, sex, age, feet, inches, weight, bodyFatPercentage), Activity.SEDENTARY);
            case 25 -> health = new Health(PersonController.getPerson(
                    name, sex, age, feet, inches, weight, bodyFatPercentage), Activity.LIGHT);
            case 50 -> health = new Health(PersonController.getPerson(
                    name, sex, age, feet, inches, weight, bodyFatPercentage), Activity.MODERATE);
            case 75 -> health = new Health(PersonController.getPerson(
                    name, sex, age, feet, inches, weight, bodyFatPercentage), Activity.HEAVY);
            case 100 -> health = new Health(PersonController.getPerson(
                    name, sex, age, feet, inches, weight, bodyFatPercentage), Activity.ATHLETE);
        }
        return health;
    }

    @PostMapping("/get/all")
    private List<Object> getAllData(@RequestParam (name = "username") String username) {
        List<Object> data = new ArrayList<>();
        Person person = personService.getPerson(userService.userID(username.toLowerCase()));
        Health health = healthService.getHealth(person);
        health.setPerson(person);
        if (!health.getEquipment() && health.getWorkout().get(0) != Workout.LISS &&
                !health.getWorkout().contains(Workout.CALISTHENICS)) {
            List<Workout> workout = new ArrayList<>(health.getWorkout());
            workout.add(Workout.CALISTHENICS);
            health.setWorkout(workout);
        } else if (health.getEquipment() && health.getWorkout().contains(Workout.CALISTHENICS)) {
            List<Workout> workout = new ArrayList<>(health.getWorkout());
            workout.remove(Workout.CALISTHENICS);
            health.setWorkout(workout);
        }
        healthService.updateHealth(health);
        data.add(health);
        data.add(List.of(health.BMI(), health.BMR(), health.TDEE(), health.calories(), health.protein()));
        data.add(health.getWorkout());
        data.add(health.routine());
        return data;
    }

    @PostMapping("/get/data")
    private List<Number> getHealthData(@RequestParam (name = "name") String name,
                                       @RequestParam (name = "sex") String sex, @RequestParam (name = "age") int age,
                                       @RequestParam (name = "feet") int feet,
                                       @RequestParam (name = "inches") int inches,
                                       @RequestParam (name = "weight") int weight,
                                       @RequestParam (name = "bodyFatPercentage") int bodyFatPercentage,
                                       @RequestParam (name = "activity") int activity,
                                       @RequestParam (name = "diet") String diet) {
        Health health = getHealth(name, sex, age, feet, inches, weight, bodyFatPercentage, activity);
        if (diet.equals("cut")) {
            health.setDiet(Diet.CUT);
        } else if (diet.equals("bulk")) {
            health.setDiet(Diet.BULK);
        } else {
            health.setDiet(Diet.MAINTAIN);
        }
        return List.of(health.BMI(), health.BMR(), health.TDEE(), health.calories(), health.protein());
    }

    @PostMapping("/get/workout")
    private List<Object> getWorkout(@RequestParam (name = "name") String name, @RequestParam (name = "sex") String sex,
                                     @RequestParam (name = "age") int age, @RequestParam (name = "feet") int feet,
                                     @RequestParam (name = "inches") int inches,
                                     @RequestParam (name = "weight") int weight,
                                     @RequestParam (name = "bodyFatPercentage") int bodyFatPercentage,
                                     @RequestParam (name = "activity") int activity,
                                     @RequestParam (name = "diet") String diet,
                                     @RequestParam (name = "goals") List<String> goals,
                                     @RequestParam (name = "experience") String experience,
                                     @RequestParam (name = "equipment") String equipment) {
        Health health = getHealth(name, sex, age, feet, inches, weight, bodyFatPercentage, activity);
        if (diet.equals("cut")) {
            health.setDiet(Diet.CUT);
        } else if (diet.equals("bulk")) {
            health.setDiet(Diet.BULK);
        } else {
            health.setDiet(Diet.MAINTAIN);
        }
        if (goals.size() == 1) {
            if (goals.contains("endurance")) {
                health.setWorkout(List.of(Workout.LISS, Workout.HITT));
            } else if (goals.contains("muscle")) {
                health.setWorkout(List.of(Workout.BODYBUILDING));
            } else {
                health.setWorkout(List.of(Workout.POWERLIFTING));
            }
        } else {
            if (goals.contains("endurance") && goals.contains("muscle")) {
                health.setWorkout(List.of(Workout.BODYBUILDING, Workout.LISS));
            } else if (goals.contains("endurance") && goals.contains("strength")) {
                health.setWorkout(List.of(Workout.POWERLIFTING, Workout.LISS));
            } else {
                health.setWorkout(List.of(Workout.POWERBUILDING));
            }
        }
        if (experience.equals("beginner")) {
            health.setExperience(Experience.BEGINNER);
        } else if (experience.equals("intermediate")) {
            health.setExperience(Experience.INTERMEDIATE);
        } else {
            health.setExperience(Experience.ADVANCED);
        }
        health.setEquipment(equipment.equals("yes"));
        if (equipment.equals("no") && health.getWorkout().get(0) != Workout.LISS) {
            List<Workout> workout = new ArrayList<>(health.getWorkout());
            workout.add(Workout.CALISTHENICS);
            health.setWorkout(workout);
        } else if (equipment.equals("yes") && health.getWorkout().contains(Workout.CALISTHENICS)) {
            List<Workout> workout = new ArrayList<>(health.getWorkout());
            workout.remove(Workout.CALISTHENICS);
            health.setWorkout(workout);
        }
        return List.of(health.getWorkout(), health.routine());
    }

    @PostMapping("/create")
    private void createHealth(@RequestParam (name = "activity") int activity,
                              @RequestParam (name = "username") String username) {
        switch (activity) {
            case 0 -> healthService.insertHealth(
                    new Health(personService.getPerson(userService.userID(username.toLowerCase())),
                    Activity.SEDENTARY));
            case 25 -> healthService.insertHealth(
                    new Health(personService.getPerson(userService.userID(username.toLowerCase())),
                    Activity.LIGHT));
            case 50 -> healthService.insertHealth(
                    new Health(personService.getPerson(userService.userID(username.toLowerCase())),
                    Activity.MODERATE));
            case 75 -> healthService.insertHealth(
                    new Health(personService.getPerson(userService.userID(username.toLowerCase())),
                    Activity.HEAVY));
            case 100 -> healthService.insertHealth(
                    new Health(personService.getPerson(userService.userID(username.toLowerCase())),
                    Activity.ATHLETE));
        }
    }

    @PostMapping("/diet")
    private void updateDiet(@RequestParam (name = "diet") String diet,
                            @RequestParam (name = "username") String username) {
        Health health = healthService.getHealth(personService.getPerson(userService.userID(username.toLowerCase())));
        if (diet.equals("cut")) {
            health.setDiet(Diet.CUT);
        } else if (diet.equals("bulk")) {
            health.setDiet(Diet.BULK);
        } else {
            health.setDiet(Diet.MAINTAIN);
        }
        healthService.updateHealth(health);
    }

    @PostMapping("/fitness")
    private void updateWorkout(@RequestBody List<String> goals) {
        Health health = healthService.getHealth(personService.getPerson(userService.userID(
                goals.get(goals.size() - 1).toLowerCase())));
        if (goals.size() == 2) {
            if (goals.contains("endurance")) {
                health.setWorkout(List.of(Workout.LISS, Workout.HITT));
            } else if (goals.contains("muscle")) {
                health.setWorkout(List.of(Workout.BODYBUILDING));
            } else {
                health.setWorkout(List.of(Workout.POWERLIFTING));
            }
        } else {
            if (goals.contains("endurance") && goals.contains("muscle")) {
                health.setWorkout(List.of(Workout.BODYBUILDING, Workout.LISS));
            } else if (goals.contains("endurance") && goals.contains("strength")) {
                health.setWorkout(List.of(Workout.POWERLIFTING, Workout.LISS));
            } else {
                health.setWorkout(List.of(Workout.POWERBUILDING));
            }
        }
        healthService.updateHealth(health);
    }

    @PostMapping("/fitness/experience")
    private void updateExperience(@RequestParam (name = "experience") String experience,
                                  @RequestParam (name = "username") String username) {
        Health health = healthService.getHealth(personService.getPerson(userService.userID(username.toLowerCase())));
        if (experience.equals("beginner")) {
            health.setExperience(Experience.BEGINNER);
        } else if (experience.equals("intermediate")) {
            health.setExperience(Experience.INTERMEDIATE);
        } else {
            health.setExperience(Experience.ADVANCED);
        }
        healthService.updateHealth(health);
    }

    @PostMapping("/fitness/equipment")
    private void updateEquipment(@RequestParam (name = "equipment") String equipment,
                                 @RequestParam (name = "username") String username) {
        Health health = healthService.getHealth(personService.getPerson(userService.userID(username.toLowerCase())));
        health.setEquipment(equipment.equals("yes"));
        if (equipment.equals("no") && health.getWorkout().get(0) != Workout.LISS) {
            List<Workout> workout = new ArrayList<>(health.getWorkout());
            workout.add(Workout.CALISTHENICS);
            health.setWorkout(workout);
        } else if (equipment.equals("yes") && health.getWorkout().contains(Workout.CALISTHENICS)) {
            List<Workout> workout = new ArrayList<>(health.getWorkout());
            workout.remove(Workout.CALISTHENICS);
            health.setWorkout(workout);
        }
        healthService.updateHealth(health);
    }
}