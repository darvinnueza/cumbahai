package com.bahai.community.repository;

import com.bahai.community.model.GroupType;
import jakarta.enterprise.context.ApplicationScoped;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

@ApplicationScoped
public class GroupTypeRepository implements PanacheRepository<GroupType> { }
