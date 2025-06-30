package com.bahai.community.repository;

import java.util.List;
import com.bahai.community.model.Group;
import com.bahai.community.model.GroupType;
import jakarta.enterprise.context.ApplicationScoped;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

@ApplicationScoped
public class GroupRepository implements PanacheRepository<Group> {

    public List<Group> findByTypeId(Long typeId) {
        return find("type.id", typeId).list();
    }
}