package com.github.nawafeo.Lean.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "healths")
public class Health {

    @Id
    private String id;
    private Person person;
    private Activity activity;
    private Diet diet;
    private List<Workout> workout;
    private Experience experience;
    private Boolean equipment;

    public Health(Person person, Activity activity) {
        this.person = person;
        this.activity = activity;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Person getPerson() {
        return person;
    }

    public Activity getActivity() {
        return activity;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }

    public Diet getDiet() {
        return diet;
    }

    public void setDiet(Diet diet) {
        this.diet = diet;
    }

    public List<Workout> getWorkout() {
        return workout;
    }

    public void setWorkout(List<Workout> workout) {
        this.workout = workout;
    }

    public Experience getExperience() {
        return experience;
    }

    public void setExperience(Experience experience) {
        this.experience = experience;
    }

    public Boolean getEquipment() {
        return equipment;
    }

    public void setEquipment(Boolean equipment) {
        this.equipment = equipment;
    }

    public int protein() {
        return (int) Math.round(person.getWeight() * 0.7);
    }

    public Routine routine() {
        if (workout.get(0) == Workout.LISS) {
            if (experience == Experience.BEGINNER) {
                return Routine.JOSH_CLARK_C25K;
            } else if (experience == Experience.INTERMEDIATE) {
                return Routine.HAL_HIGDON_N10K;
            } else {
                return Routine.HAL_HIGDON_I15k;
            }
        } else {
            if (equipment) {
                if (experience == Experience.BEGINNER) {
                    return Routine.FITNESS_BBR;
                } else if (experience == Experience.INTERMEDIATE) {
                    if (workout.get(0) == Workout.BODYBUILDING) {
                        return Routine.JASON_BLAHA_ICF;
                    } else if (workout.get(0) == Workout.POWERLIFTING) {
                        return Routine.CODY_LEFEVER_GZCLP;
                    } else {
                        return Routine.JIM_WENDLER_531;
                    }
                } else {
                    if (workout.get(0) == Workout.BODYBUILDING) {
                        return Routine.METALLICADPA_PPL;
                    } else if (workout.get(0) == Workout.POWERLIFTING) {
                        return Routine.JOE_DEFRANCO_WS4SB;
                    } else {
                        return Routine.LAYNE_NORTON_PHAT;
                    }
                }
            } else {
                if (experience == Experience.BEGINNER) {
                    return Routine.BODYWEIGHT_FITNESS_RR;
                } else if (experience == Experience.INTERMEDIATE) {
                    if (workout.get(0) == Workout.POWERLIFTING) {
                        return Routine.ANTRANIK_PPL;
                    } else {
                        return Routine.BODYWEIGHT_FITNESS_BWPPL;
                    }
                } else {
                    return Routine.BODYWEIGHT_FITNESS_BWPLUS;
                }
            }
        }
    }

    public double BMI() {
        // Body Mass Index
        return Math.round(703 * person.getWeight() / Math.pow(person.getHeight(), 2) * 100) / 100.0;
    }

    public double unroundedBMR() {
        // Converting weight and height to metric units
        double weightKG = person.getWeight() * 0.453592;
        double heightCM = person.getHeight() * 2.54;
        if (person.getBodyFatPercentage() == null) {
            // Mifflin-St Jeor Equations
            if (person.getSex() == Sex.MALE) {
                return (10 * weightKG) + (6.25 * heightCM) - (5 * person.getAge()) + 5;
            } else {
                return (10 * weightKG) + (6.25 * heightCM) - (5 * person.getAge()) - 161;
            }
        } else {
            // Katch-McArdle Formula
            return 370 + 21.6 * (1 - person.getBodyFatPercentage() / 100.0) * weightKG;
        }
    }

    public int BMR() {
        // Basal Metabolic Rate
        return (int) Math.round(unroundedBMR());
    }

    public int TDEE() {
        double activityMultiplier = 0;
        // Katch-McArdle Multipliers
        switch (activity) {
            case SEDENTARY -> activityMultiplier = 1.2;
            case LIGHT -> activityMultiplier = 1.375;
            case MODERATE -> activityMultiplier = 1.55;
            case HEAVY -> activityMultiplier = 1.725;
            case ATHLETE -> activityMultiplier = 1.9;
        }
        // Total Daily Energy Expenditure (Maintanence Calories)
        return (int) Math.round(unroundedBMR() * activityMultiplier);
    }

    public int calories() {
        if (diet == Diet.CUT) {
            return TDEE() - 500;
        } else if (diet == Diet.BULK) {
            return TDEE() + 500;
        }
        return TDEE();
    }
}
