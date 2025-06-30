package com.bahai.community.resource.dto;

import lombok.Data;

@Data
public class HostResponse {
    private Long id;
    private PersonResponse person;
    private GroupResponse group;
}