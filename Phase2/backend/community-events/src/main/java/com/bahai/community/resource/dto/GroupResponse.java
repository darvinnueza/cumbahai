package com.bahai.community.resource.dto;

import lombok.Data;
import java.util.List;

@Data
public class GroupResponse {
    private Long id;
    private String name;
    private String groupType;
    private List<PersonResponse> members;
}