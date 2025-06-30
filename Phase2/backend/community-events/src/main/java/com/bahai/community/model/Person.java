package com.bahai.community.model;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "persons")
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    @Column(name = "first_name")
    public String firstName;
    @Column(name = "last_name")
    public String lastName;
    public String phone;
    public String email;
    @Column(name = "birth_date")
    public LocalDate birthDate;
    @Column(name = "age_group")
    public String ageGroup;

    @ManyToMany(mappedBy = "members")
    @JsonBackReference
    public List<Group> groups;
}