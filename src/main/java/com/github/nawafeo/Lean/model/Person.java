package com.github.nawafeo.Lean.model;

import java.util.UUID;

public class Person {

    private final String name;
    private final UUID id;
    // Biological sex
    private final Sex sex;
    private int age;
    // Imperial Units (lbs for weight, inches for height)
    private int weight;
    private int height;
    // May be null
    private Double bodyFatPercentage;


    public Person(String name, UUID id, int age, Sex sex, int weight, int height, Double bodyFatPercentage) {
        this.name = name;
        this.id = id;
        this.age = age;
        this.sex = sex;
        this.weight = weight;
        this.height = height;
        this.bodyFatPercentage = bodyFatPercentage;
    }


    public String getName() {
        return name;
    }

    public UUID getId() {
        return id;
    }

    public Sex getSex() {
        return sex;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public Double getBodyFatPercentage() {
        return bodyFatPercentage;
    }

    public void setBodyFatPercentage(Double bodyFatPercentage) {
        this.bodyFatPercentage = bodyFatPercentage;
    }
}
