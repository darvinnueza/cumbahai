package com.bahai.community.mapper;

import com.bahai.community.model.*;
import com.bahai.community.resource.dto.*;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class ActivityMapper {

    public ActivityResponse toActivityResponse(Activity activity) {
        if (activity == null) return null;

        ActivityResponse dto = new ActivityResponse();
        dto.setId(activity.getId());
        dto.setDateTime(activity.getDateTime());

        // Event
        dto.setEvent(toEventResponse(activity.getEvent()));

        // Host (with person/group)
        dto.setHost(toHostResponse(activity.getHost()));

        return dto;
    }

    public Activity toActivity(ActivityRequest request, Event event, Host host) {
        Activity activity = new Activity();
        activity.setEvent(event);
        activity.setHost(host);
        activity.setDateTime(request.getDateTime());
        return activity;
    }

    public EventResponse toEventResponse(Event event) {
        if (event == null) return null;

        EventResponse dto = new EventResponse();
        dto.setId(event.getId());
        dto.setName(event.getName());
        dto.setStartDate(event.getStartDate());
        dto.setEndDate(event.getEndDate());

        if (event.getEventType() != null) {
            dto.setEventTypeName(event.getEventType().getName());
        }

        return dto;
    }

    public HostResponse toHostResponse(Host host) {
        if (host == null) return null;

        HostResponse dto = new HostResponse();
        dto.setId(host.getId());

        // Mapear Person
        if (host.getPerson() != null) {
            Person person = host.getPerson();
            PersonResponse personDto = new PersonResponse();
            personDto.setId(person.getId());
            personDto.setFirstName(person.getFirstName());
            personDto.setLastName(person.getLastName());
            personDto.setPhone(person.getPhone());
            personDto.setEmail(person.getEmail());
            personDto.setBirthDate(person.getBirthDate());
            personDto.setAgeGroup(person.getAgeGroup());
            dto.setPerson(personDto);
        }

        // Mapear Group
        if (host.getGroup() != null) {
            Group group = host.getGroup();
            GroupResponse groupDto = new GroupResponse();
            groupDto.setId(group.getId());
            groupDto.setName(group.getName());

            // Mapear el nombre del tipo de grupo
            if (group.getType() != null) {
                groupDto.setGroupType(group.getType().getName());
            }

            // Mapear los miembros del grupo
            if (group.getMembers() != null && !group.getMembers().isEmpty()) {
                List<PersonResponse> members = group.getMembers().stream().map(member -> {
                    PersonResponse memberDto = new PersonResponse();
                    memberDto.setId(member.getId());
                    memberDto.setFirstName(member.getFirstName());
                    memberDto.setLastName(member.getLastName());
                    memberDto.setPhone(member.getPhone());
                    memberDto.setEmail(member.getEmail());
                    memberDto.setBirthDate(member.getBirthDate());
                    memberDto.setAgeGroup(member.getAgeGroup());
                    return memberDto;
                }).toList();
                groupDto.setMembers(members);
            }

            dto.setGroup(groupDto);
        }

        return dto;
    }
}