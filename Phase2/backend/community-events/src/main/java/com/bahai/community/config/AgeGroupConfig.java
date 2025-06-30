package com.bahai.community.config;

import java.time.Period;
import java.time.LocalDate;
import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@ApplicationScoped
public class AgeGroupConfig {

    @ConfigProperty(name = "age.group.0-11")
    String GROUP_1;

    @ConfigProperty(name = "age.group.12-14")
    String GROUP_2;

    @ConfigProperty(name = "age.group.15-29")
    String GROUP_3;

    @ConfigProperty(name = "age.group.30-59")
    String GROUP_4;

    @ConfigProperty(name = "age.group.60+")
    String GROUP_5;

    @ConfigProperty(name = "age.group.unknown")
    String GROUP_UNKNOWN;

    public String getAgeGroup(int age) {
        if (age < 0) return GROUP_UNKNOWN;
        if (age <= 11) return GROUP_1;
        if (age <= 14) return GROUP_2;
        if (age <= 29) return GROUP_3;
        if (age <= 59) return GROUP_4;
        return GROUP_5;
    }

    public String getAgeGroup(LocalDate birthDate) {
        if (birthDate == null) return GROUP_UNKNOWN;
        int age = Period.between(birthDate, LocalDate.now()).getYears();
        return getAgeGroup(age);
    }
}