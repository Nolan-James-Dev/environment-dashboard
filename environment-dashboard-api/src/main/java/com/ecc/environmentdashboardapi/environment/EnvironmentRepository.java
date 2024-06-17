package com.ecc.environmentdashboardapi.environment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface EnvironmentRepository extends JpaRepository<Environment, Integer> {

    @Query("""
            SELECT env
            FROM Environment env
            WHERE env.name = :name
            """)
    Optional<Environment> findByName(String name);
}
