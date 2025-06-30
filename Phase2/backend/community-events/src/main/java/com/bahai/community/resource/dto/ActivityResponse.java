package com.bahai.community.resource.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ActivityResponse {
    private Long id;
    private EventResponse event;
    private HostResponse host;
    private LocalDateTime dateTime;
}