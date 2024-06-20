package com.ecc.environmentdashboardapi.environment;

import java.util.List;

public interface EnvironmentService {
    EnvironmentResponse createEnvironment(EnvironmentRequest request);

    List<EnvironmentResponse> getEnvironments();

}
