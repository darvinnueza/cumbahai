package com.bahai.community.resource.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ActivityRequest {
    private Long eventId;
    private HostRequest host;
    private LocalDateTime dateTime;
}