package com.bahai.community.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import com.bahai.community.model.Person;
import com.bahai.community.resource.dto.PersonRequest;
import com.bahai.community.resource.dto.PersonResponse;

@Mapper(componentModel = "cdi")
public interface PersonMapper {

    PersonRequest toPersonRequest(Person person);

    @Mapping(target = "id", ignore = true)
    Person toPerson(PersonRequest request);

    PersonResponse toPersonResponse(Person person);
}