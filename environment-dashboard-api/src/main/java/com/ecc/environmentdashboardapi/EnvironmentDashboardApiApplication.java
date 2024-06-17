package com.ecc.environmentdashboardapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class EnvironmentDashboardApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(EnvironmentDashboardApiApplication.class, args);
    }

}
