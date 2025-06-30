package com.bahai.community.repository;

import com.bahai.community.model.Person;
import jakarta.enterprise.context.ApplicationScoped;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import java.util.List;

@ApplicationScoped
public class PersonRepository implements PanacheRepository<Person> {

    public List<Person> findByGroupId(Long groupId) {
        return find("group.id", groupId).list();
    }
}