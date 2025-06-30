package com.bahai.community.resource.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class EventResponse {
    public Long id;
    public String name;
    public LocalDate startDate;
    public LocalDate endDate;
    public String eventTypeName;
}