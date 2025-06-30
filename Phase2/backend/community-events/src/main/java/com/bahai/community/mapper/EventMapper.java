package com.bahai.community.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import com.bahai.community.model.Event;
import com.bahai.community.resource.dto.EventRequest;
import com.bahai.community.resource.dto.EventResponse;

@Mapper(componentModel = "cdi")
public interface EventMapper {

    EventRequest toEventRequest(Event event);
    @Mapping(source = "eventType.name", target = "eventTypeName")
    EventResponse toEventResponse(Event event);
    @Mapping(target = "id", ignore = true)
    Event toEvent(EventRequest request);
}
