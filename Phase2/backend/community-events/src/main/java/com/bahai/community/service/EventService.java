package com.bahai.community.service;

import java.util.List;

import com.bahai.community.mapper.EventMapper;
import jakarta.inject.Inject;
import com.bahai.community.model.Event;
import jakarta.transaction.Transactional;
import com.bahai.community.model.EventType;
import jakarta.enterprise.context.ApplicationScoped;
import com.bahai.community.resource.dto.EventRequest;
import com.bahai.community.resource.dto.EventResponse;
import com.bahai.community.repository.EventRepository;
import com.bahai.community.repository.EventTypeRepository;

@ApplicationScoped
public class EventService {

    @Inject
    EventRepository eventRepository;

    @Inject
    EventTypeRepository eventTypeRepository;

    @Inject
    EventMapper mapper;

    public List<EventResponse> findAll() {
        List<Event> events = eventRepository.listAll();
        return events.stream()
                .map(mapper::toEventResponse)
                .toList();
    }

    public EventResponse findById(Long id) {
        Event event = eventRepository.findById(id);
        return mapper.toEventResponse(event);
    }

    public List<EventResponse> findByEventTypeId(Long eventTypeId) {
        List<Event> events = eventRepository.findByEventTypeId(eventTypeId);
        return events.stream()
                .map(mapper::toEventResponse)
                .toList();
    }

    @Transactional
    public EventResponse save(EventRequest request) {
        Event event = mapper.toEvent(request);
        if (request.getEventTypeId() != null) {
            EventType eventType = eventTypeRepository.findById(request.getEventTypeId());
            event.setEventType(eventType);
        }
        eventRepository.persist(event);
        return mapper.toEventResponse(event);
    }

    public EventResponse update(Long id, EventRequest request) {
        Event existing = eventRepository.findById(id);
        if (existing == null) {
            return null;
        }
        existing.setName(request.getName());
        existing.setStartDate(request.getStartDate());
        existing.setEndDate(request.getEndDate());
        return mapper.toEventResponse(existing);
    }

    @Transactional
    public Boolean delete(Long id) {
        Event event = eventRepository.findById(id);
        if (event == null) {
            return false;
        }
        eventRepository.delete(event);
        return true;
    }
}