package com.bahai.community.resource.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class PersonResponse {
    public Long id;
    public String firstName;
    public String lastName;
    public String phone;
    public String email;
    public LocalDate birthDate;
    public String ageGroup;
}