package com.bahai.community.repository;

import com.bahai.community.model.Activity;
import jakarta.enterprise.context.ApplicationScoped;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import java.util.List;

@ApplicationScoped
public class ActivityRepository implements PanacheRepository<Activity> {
    public List<Activity> findByEventTypeId(Long eventTypeId) {
        return list("event.eventType.id", eventTypeId);
    }
}
