package com.bahai.community.mapper;

import jakarta.inject.Inject;
import java.util.stream.Collectors;
import com.bahai.community.model.Group;
import jakarta.enterprise.context.ApplicationScoped;
import com.bahai.community.resource.dto.GroupResponse;

@ApplicationScoped
public class GroupMapper {
    @Inject
    PersonMapper personMapper;
    @Inject
    GroupTypeMapper groupTypeMapper;

    public GroupResponse toGroupResponse(Group group) {
        GroupResponse response = new GroupResponse();
        response.setId(group.getId());
        response.setName(group.getName());
        response.setGroupType(group.getType().getName());
        response.setMembers(
                group.getMembers().stream()
                        .map(personMapper::toPersonResponse)
                        .collect(Collectors.toList())
        );
        return response;
    }
}