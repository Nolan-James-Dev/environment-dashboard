package com.ecc.environmentdashboardapi.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("""
            SELECT _user
            FROM User _user
            WHERE _user.username = :username
            """)
    Optional<User> findByUsername(String username);
}
