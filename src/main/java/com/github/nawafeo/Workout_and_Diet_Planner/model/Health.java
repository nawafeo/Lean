package com.github.nawafeo.Workout_and_Diet_Planner.model;

public class Health {

    private final Person person;
    private Activity activity;

    public Health(Person person, Activity activity) {
        this.person = person;
        this.activity = activity;
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

    public double BMI() {
        // Body Mass Index
        return 703 * person.getWeight() / Math.pow(person.getHeight(), 2);
    }

    public double PI() {
        // Rohrer's Ponderal Index (Arguably more "accurate" than BMI in measuring corpulence or leanness)
        return person.getHeight() / Math.cbrt(person.getWeight());
    }

    public double unroundedBMR() {
        // Converting weight and height to metric units
        double weightKG = person.getWeight() * 0.453592;
        double heightCM = person.getHeight() * 2.54;
        if (person.getBodyFatPercentage() == null) {
            // Mifflin-St Jeor Equations
            if (person.getSex() == Sex.Male) {
                return (10 * weightKG) + (6.25 * heightCM) - (5 * person.getAge()) + 5;
            } else {
                return (10 * weightKG) + (6.25 * heightCM) - (5 * person.getAge()) - 161;
            }
        } else {
            // Katch-McArdle Formula
            return 370 + 21.6 * (1 - person.getBodyFatPercentage() / 100) * weightKG;
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
            case Sedentary -> activityMultiplier = 1.2;
            case Light -> activityMultiplier = 1.375;
            case Moderate -> activityMultiplier = 1.55;
            case Heavy -> activityMultiplier = 1.725;
            case Athlete -> activityMultiplier = 1.9;
        }
        // Total Daily Energy Expenditure (Maintanence Calories)
        return (int) Math.round(unroundedBMR() * activityMultiplier);
    }
}
