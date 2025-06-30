package com.bahai.community.mapper;

import com.bahai.community.model.EventType;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import com.bahai.community.resource.dto.EventTypeRequest;

@Mapper(componentModel = "cdi")
public interface EventTypeMapper {
    EventTypeRequest toEventTypeRequest(EventType eventTypes);
    @Mapping(target = "id", ignore = true)
    EventType toEventType(EventTypeRequest request);
}