package com.bahai.community.service;

import java.util.List;

import com.bahai.community.util.AgeGroupHelper;
import jakarta.inject.Inject;
import com.bahai.community.model.Person;
import jakarta.transaction.Transactional;
import com.bahai.community.mapper.PersonMapper;
import jakarta.enterprise.context.ApplicationScoped;
import com.bahai.community.resource.dto.PersonRequest;
import com.bahai.community.repository.PersonRepository;

@ApplicationScoped
public class PersonService {

    @Inject
    PersonMapper mapper;

    @Inject
    PersonRepository repository;

    @Inject
    AgeGroupHelper ageGroupHelper;

    public List<Person> findAll() {
        return repository.listAll();
    }

    public Person findById(Long id) {
        return repository.findById(id);
    }

    @Transactional
    public Person save(PersonRequest request) {
        Person person = mapper.toPerson(request);
        person.setAgeGroup(ageGroupHelper.resolveGroupFromBirthDate(person.getBirthDate()));
        repository.persistAndFlush(person);
        return person;
    }

    public Person update(Long id, PersonRequest request) {
        Person existing = repository.findById(id);
        if (existing == null) {
            return null;
        }
        existing.setFirstName(request.getFirstName());
        existing.setLastName(request.getLastName());
        existing.setPhone(request.getPhone());
        existing.setEmail(request.getEmail());
        existing.setBirthDate(request.getBirthDate());
        existing.setAgeGroup(ageGroupHelper.resolveGroupFromBirthDate(existing.getBirthDate()));
        return existing;
    }

    @Transactional
    public Boolean delete(Long id) {
        Person person = repository.findById(id);
        if (person == null) {
            return false;
        }
        repository.delete(person);
        return true;
    }
}