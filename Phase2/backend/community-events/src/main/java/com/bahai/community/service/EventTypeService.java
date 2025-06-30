package com.bahai.community.service;

import java.util.List;

import com.bahai.community.model.EventType;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import com.bahai.community.mapper.EventTypeMapper;
import jakarta.enterprise.context.ApplicationScoped;
import com.bahai.community.resource.dto.EventTypeRequest;
import com.bahai.community.repository.EventTypeRepository;

@ApplicationScoped
public class EventTypeService {

    @Inject
    EventTypeRepository repository;

    @Inject
    EventTypeMapper mapper;

    public List<EventType> findAll() {
        return repository.listAll();
    }

    public EventType findById(Long id) {
        return repository.findById(id);
    }

    @Transactional
    public EventType save(EventTypeRequest request) {
        EventType eventType = mapper.toEventType(request);
        repository.persist(eventType);
        return eventType;
    }

    public EventType update(Long id, EventTypeRequest request) {
        EventType existing = repository.findById(id);
        if (existing == null) {
            return null;
        }
        existing.setName(request.getName());
        return existing;
    }

    @Transactional
    public Boolean delete(Long id) {
        EventType eventTypes = repository.findById(id);
        if (eventTypes == null) {
            return false;
        }
        repository.delete(eventTypes);
        return true;
    }
}