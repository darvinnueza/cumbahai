package com.bahai.community.resource.dto;

import lombok.Data;
import java.util.List;

@Data
public class GroupRequest {

    private String name;
    private Long groupTypeId;
    private List<Long> personIds;
}