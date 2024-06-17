package com.ecc.environmentdashboardapi.environment;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import static com.ecc.environmentdashboardapi.environment.EnvironmentValidationMessage.*;

public record EnvironmentRequest(
        @NotNull(message = NAME_NOT_NULL_OR_EMPTY)
        @NotEmpty(message = NAME_NOT_NULL_OR_EMPTY)
        String name,

        @NotNull(message = DESCRIPTION_NOT_NULL_OR_EMPTY)
        @NotEmpty(message = DESCRIPTION_NOT_NULL_OR_EMPTY)
        String description
) {
}
