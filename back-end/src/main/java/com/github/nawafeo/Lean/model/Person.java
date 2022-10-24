package com.github.nawafeo.Lean.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "persons")
public class Person {

    @Id
    private String id;
    private final String userId;
    private String name;
    // Biological sex
    private Sex sex;
    private int age;
    // Imperial Units (inches for height, lbs for weight)
    private int height;
    private int weight;
    // May be null
    private Integer bodyFatPercentage = null;

    public Person(String userId, String name) {
        this.userId = userId;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Sex getSex() {
        return sex;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
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

    public Integer getBodyFatPercentage() {
        return bodyFatPercentage;
    }

    public void setBodyFatPercentage(Integer bodyFatPercentage) {
        this.bodyFatPercentage = bodyFatPercentage;
    }
}
