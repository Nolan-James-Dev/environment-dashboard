package com.ecc.environmentdashboardapi.environment;

import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class EnvironmentServiceImpl implements EnvironmentService {
    private final EnvironmentRepository environmentRepository;
    private final EnvironmentMapper environmentMapper;

    @Override
    public EnvironmentResponse createEnvironment(EnvironmentRequest request) {
        log.info("Attempting to create environment with name: {}", request.name());
        Optional<Environment> optionalEnvironment = environmentRepository.findByName(request.name());

        if (optionalEnvironment.isEmpty()) {
            Environment environment = Environment.builder()
                    .name(request.name())
                    .description(request.description())
                    .build();
            environmentRepository.save(environment);

            log.info("Environment created with name: {}", request.name());
            return environmentMapper.toEnvironmentResponse(environment);
        } else {
            log.warn("Environment already exists: {}", request.name());
            throw new EntityExistsException(EnvironmentExceptionResponse.ENTITY_EXISTS);
        }
    }

    @Override
    public List<EnvironmentResponse> getEnvironments() {
        log.info("Get request for all environments");
        return environmentRepository.findAll().stream()
                .map(environmentMapper::toEnvironmentResponse)
                .toList();
    }
}
