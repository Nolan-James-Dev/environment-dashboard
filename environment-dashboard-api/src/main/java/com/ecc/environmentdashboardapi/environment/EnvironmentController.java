package com.ecc.environmentdashboardapi.environment;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("environments")
@RequiredArgsConstructor
public class EnvironmentController {

    private final EnvironmentService environmentService;

    @PostMapping
    public ResponseEntity<EnvironmentResponse> createEnvironment(EnvironmentRequest request) {
        return ResponseEntity.ok(environmentService.createEnvironment(request));
    }

    @GetMapping
    public ResponseEntity<List<EnvironmentResponse>> getEnvironments() {
        return ResponseEntity.ok(environmentService.getEnvironments());
    }
}
