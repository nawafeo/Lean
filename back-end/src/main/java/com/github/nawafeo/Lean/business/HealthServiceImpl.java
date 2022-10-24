package com.github.nawafeo.Lean.business;

import com.github.nawafeo.Lean.dao.HealthRepository;
import com.github.nawafeo.Lean.model.Health;
import com.github.nawafeo.Lean.model.Person;
import org.springframework.stereotype.Service;

@Service
public class HealthServiceImpl implements HealthService {

    private final HealthRepository healthRepository;

    public HealthServiceImpl(HealthRepository healthRepository) {
        this.healthRepository = healthRepository;
    }

    @Override
    public void insertHealth(Health health) {
        Health h = healthRepository.findByPersonUserId(health.getPerson().getUserId());
        if (h == null) {
            healthRepository.insert(health);
        } else {
            h.setActivity(health.getActivity());
            healthRepository.save(h);
        }
    }

    @Override
    public Health getHealth(Person person) {
        return healthRepository.findByPersonUserId(person.getUserId());
    }

    @Override
    public void updateHealth(Health health) {
        healthRepository.save(health);
    }
}
