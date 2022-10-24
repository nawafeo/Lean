package com.github.nawafeo.Lean.business;

import com.github.nawafeo.Lean.model.Health;
import com.github.nawafeo.Lean.model.Person;

public interface HealthService {

    void insertHealth(Health health);
    Health getHealth(Person person);
    void updateHealth(Health health);
}
