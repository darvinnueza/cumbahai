package com.bahai.community.resource.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class EventRequest {

    public String name;
    public LocalDate startDate;
    public LocalDate endDate;
    public Long eventTypeId;
}