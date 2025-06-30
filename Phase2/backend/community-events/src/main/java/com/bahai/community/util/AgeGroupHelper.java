package com.bahai.community.util;

import java.time.LocalDate;
import jakarta.inject.Inject;
import com.bahai.community.config.AgeGroupConfig;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class AgeGroupHelper {

    @Inject
    AgeGroupConfig config;

    public String resolveGroupFromBirthDate(LocalDate birthDate) {
        return config.getAgeGroup(birthDate);
    }
}