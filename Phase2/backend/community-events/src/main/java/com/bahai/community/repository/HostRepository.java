package com.bahai.community.repository;

import com.bahai.community.model.Host;
import jakarta.enterprise.context.ApplicationScoped;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

@ApplicationScoped
public class HostRepository implements PanacheRepository<Host> { }