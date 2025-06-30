package com.bahai.community.repository;

import com.bahai.community.model.EventType;
import jakarta.enterprise.context.ApplicationScoped;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

@ApplicationScoped
public class EventTypeRepository implements PanacheRepository<EventType> { }
