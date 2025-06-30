package com.bahai.community.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import com.bahai.community.model.GroupType;
import com.bahai.community.resource.dto.GroupTypeRequest;
import com.bahai.community.resource.dto.GroupTypeResponse;

@Mapper(componentModel = "cdi")
public interface GroupTypeMapper {

    @Mapping(target = "id", ignore = true)
    GroupType toGroupType(GroupTypeRequest request);

    GroupTypeResponse toGroupTypeResponse(GroupType groupType);
}