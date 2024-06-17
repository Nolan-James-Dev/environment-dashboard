package com.ecc.environmentdashboardapi.environment;

import org.springframework.stereotype.Service;

@Service
public class EnvironmentMapper {
    public EnvironmentResponse toEnvironmentResponse(Environment environment) {

        return new EnvironmentResponse(
                environment.getName(),
                environment.getDescription()
        );
    }
}
