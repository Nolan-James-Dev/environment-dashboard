package com.ecc.environmentdashboardapi.environment;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("environments")
@RequiredArgsConstructor
public class EnvironmentController {

    private final EnvironmentService environmentService;

    @PostMapping
    public ResponseEntity<EnvironmentResponse> createEnvironment(@Valid @RequestBody EnvironmentRequest request) {
        return ResponseEntity.ok(environmentService.createEnvironment(request));
    }

    @GetMapping
    public ResponseEntity<List<EnvironmentResponse>> getEnvironments() {
        return ResponseEntity.ok(environmentService.getEnvironments());
    }
}
