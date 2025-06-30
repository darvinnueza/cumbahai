package com.bahai.community.service;

import java.util.List;
import java.util.ArrayList;
import jakarta.inject.Inject;
import jakarta.ws.rs.NotFoundException;
import com.bahai.community.model.Group;
import com.bahai.community.model.Person;
import jakarta.transaction.Transactional;
import com.bahai.community.model.GroupType;
import com.bahai.community.mapper.GroupMapper;
import jakarta.enterprise.context.ApplicationScoped;
import com.bahai.community.resource.dto.GroupRequest;
import com.bahai.community.repository.GroupRepository;
import com.bahai.community.resource.dto.GroupResponse;
import com.bahai.community.repository.PersonRepository;
import com.bahai.community.repository.GroupTypeRepository;

@ApplicationScoped
public class GroupService {

    @Inject
    GroupRepository repository;

    @Inject
    GroupTypeRepository groupTypeRepository;

    @Inject
    PersonRepository personRepository;

    @Inject
    GroupMapper mapper;

    public List<GroupResponse> findAll() {
        List<Group> groups = repository.listAll();
        return groups.stream()
                .map(mapper::toGroupResponse)
                .toList();
    }

    public GroupResponse findById(Long id) {
        Group group = repository.findById(id);
        if (group == null) {
            return null;
        }
        return mapper.toGroupResponse(group);
    }

    public List<GroupResponse> findByTypeId(Long typeId) {
        List<Group> groups = repository.findByTypeId(typeId);
        return groups.stream()
                .map(mapper::toGroupResponse)
                .toList();
    }

    @Transactional
    public GroupResponse save(GroupRequest request) {
        Group group = new Group();
        group.setName(request.getName());

        // Buscar el tipo de grupo (no se crea si no existe)
        GroupType type = groupTypeRepository.findById(request.getGroupTypeId());
        if (type == null) {
            throw new NotFoundException("Tipo de Grupo no encontrado");
        }

        group.setType(type);

        List<Person> members = new ArrayList<>();
        if (request.getPersonIds() != null) {
            for (Long personId : request.getPersonIds()) {
                Person person = personRepository.findById(personId);
                if (person != null) {
                    members.add(person);
                    if (person.getGroups() == null) {
                        person.setGroups(new ArrayList<>());
                    }
                    person.getGroups().add(group);
                }
            }
        }

        group.setMembers(members);

        repository.persist(group);

        return mapper.toGroupResponse(group);
    }

    @Transactional
    public GroupResponse update(Long id, GroupRequest request) {
        Group existingGroup = repository.findById(id);
        if (existingGroup == null) {
            throw new NotFoundException("Grupo no encontrado");
        }

        existingGroup.setName(request.getName());

        // Buscar el tipo de grupo (no se crea si no existe)
        GroupType type = groupTypeRepository.findById(request.getGroupTypeId());
        if (type == null) {
            throw new NotFoundException("Tipo de Grupo no encontrado");
        }

        existingGroup.setType(type);

        // Limpiar relaciones anteriores del lado de las personas
        if (existingGroup.getMembers() != null) {
            for (Person p : existingGroup.getMembers()) {
                p.getGroups().remove(existingGroup);
            }
        }

        // Asociar nuevas personas
        List<Person> newMembers = new ArrayList<>();
        if (request.getPersonIds() != null) {
            for (Long personId : request.getPersonIds()) {
                Person person = personRepository.findById(personId);
                if (person != null) {
                    newMembers.add(person);

                    if (person.getGroups() == null) {
                        person.setGroups(new ArrayList<>());
                    }
                    if (!person.getGroups().contains(existingGroup)) {
                        person.getGroups().add(existingGroup);
                    }
                }
            }
        }

        // Asignar nuevos miembros al grupo
        existingGroup.setMembers(newMembers);

        return mapper.toGroupResponse(existingGroup);
    }

    @Transactional
    public boolean delete(Long id) {
        Group group = repository.findById(id);
        if (group == null) {
            return false;
        }

        // Desasociar el grupo de cada persona
        if (group.getMembers() != null) {
            for (Person person : group.getMembers()) {
                person.getGroups().remove(group);
            }
            group.getMembers().clear(); // Limpia también el lado del grupo
        }

        repository.delete(group);
        return true;
    }
}