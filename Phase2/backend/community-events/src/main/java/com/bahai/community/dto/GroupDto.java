package com.bahai.community.dto;

import lombok.Data;
import java.util.List;

@Data
public class GroupDto {
    private Long id;
    private String name;
    private String type;
    private List<String> members;
}