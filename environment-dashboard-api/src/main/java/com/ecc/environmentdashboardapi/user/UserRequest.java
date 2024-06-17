package com.ecc.environmentdashboardapi.user;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record UserRequest(
        @NotNull(message = UserValidation.NOT_NULL_OR_EMPTY)
        @NotEmpty(message = UserValidation.NOT_NULL_OR_EMPTY)
        String username
) {
}
