package com.bahai.community.repository;

import java.util.List;
import com.bahai.community.model.Event;
import jakarta.enterprise.context.ApplicationScoped;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

@ApplicationScoped
public class EventRepository implements PanacheRepository<Event> {

    public List<Event> findByEventTypeId(Long eventTypeId) {
        return list("eventType.id", eventTypeId);
    }
}