package com.bahai.community.service;

import java.util.List;
import jakarta.inject.Inject;
import com.bahai.community.model.*;
import com.bahai.community.repository.*;
import jakarta.transaction.Transactional;
import com.bahai.community.mapper.ActivityMapper;
import jakarta.enterprise.context.ApplicationScoped;
import com.bahai.community.resource.dto.ActivityRequest;
import com.bahai.community.resource.dto.ActivityResponse;

@ApplicationScoped
public class ActivityService {

    @Inject
    ActivityMapper mapper;
    @Inject
    HostRepository hRepository;
    @Inject
    EventRepository eRepository;
    @Inject
    GroupRepository gRepository;
    @Inject
    PersonRepository pRepository;
    @Inject
    ActivityRepository aRepository;

    public List<ActivityResponse> findAll() {
        List<Activity> activities = aRepository.listAll();
        return activities.stream()
                .map(mapper::toActivityResponse)
                .toList();
    }

    public List<ActivityResponse> findByEventTypeId(Long eventTypeId) {
        List<Activity> activities = aRepository.findByEventTypeId(eventTypeId);
        return activities.stream()
                .map(mapper::toActivityResponse)
                .toList();
    }

    @Transactional
    public ActivityResponse save(ActivityRequest request) {
        Activity activity = new Activity();

        // Obtener el evento
        Event event = eRepository.findById(request.getEventId());
        if (event == null) {
            throw new IllegalArgumentException("Evento no encontrado con id: " + request.getEventId());
        }

        // Crear el Host con persona o grupo según corresponda
        Host host = new Host();

        if (request.getHost().getPersonId() != null) {
            Person person = pRepository.findById(request.getHost().getPersonId());
            if (person == null) {
                throw new IllegalArgumentException("Persona no encontrada con id: " + request.getHost().getPersonId());
            }
            host.setPerson(person);
        }

        if (request.getHost().getGroupId() != null) {
            Group group = gRepository.findById(request.getHost().getGroupId());
            if (group == null) {
                throw new IllegalArgumentException("Grupo no encontrado con id: " + request.getHost().getGroupId());
            }
            host.setGroup(group);
        }

        // Validar que al menos uno esté presente
        if (host.getPerson() == null && host.getGroup() == null) {
            throw new IllegalArgumentException("Debe proporcionar un personId o un groupId en el host.");
        }

        hRepository.persist(host); // guardar el host

        // Asignar propiedades a la actividad
        activity.setEvent(event);
        activity.setHost(host);
        activity.setDateTime(request.getDateTime());

        aRepository.persist(activity); // guardar la actividad

        return mapper.toActivityResponse(activity);
    }
}