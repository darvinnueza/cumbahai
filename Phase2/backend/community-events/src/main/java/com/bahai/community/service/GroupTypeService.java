package com.bahai.community.service;

import java.util.List;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import com.bahai.community.model.GroupType;
import com.bahai.community.mapper.GroupTypeMapper;
import jakarta.enterprise.context.ApplicationScoped;
import com.bahai.community.resource.dto.GroupTypeRequest;
import com.bahai.community.repository.GroupTypeRepository;
import com.bahai.community.resource.dto.GroupTypeResponse;

@ApplicationScoped
public class GroupTypeService {

    @Inject
    GroupTypeRepository repository;

    @Inject
    GroupTypeMapper mapper;

    public List<GroupTypeResponse> findAll() {
        List<GroupType> groupTypes = repository.listAll();
        return groupTypes.stream()
                .map(mapper::toGroupTypeResponse)
                .toList();
    }

    public GroupTypeResponse findById(Long id) {
        GroupType groupType = repository.findById(id);
        if (groupType == null) {
            return null;
        }
        return mapper.toGroupTypeResponse(groupType);
    }

    @Transactional
    public GroupTypeResponse save(GroupTypeRequest request) {
        GroupType groupType = mapper.toGroupType(request);
        repository.persist(groupType);
        return mapper.toGroupTypeResponse(groupType);
    }

    @Transactional
    public GroupTypeResponse update(Long id, GroupTypeRequest request) {
        GroupType existing = repository.findById(id);
        if (existing == null) {
            return null;
        }
        existing.setName(request.getName());
        return mapper.toGroupTypeResponse(existing);
    }

    @Transactional
    public Boolean delete(Long id) {
        GroupType groupType = repository.findById(id);
        if (groupType == null) {
            return false;
        }
        repository.delete(groupType);
        return true;
    }
}