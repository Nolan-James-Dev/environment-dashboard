package com.ecc.environmentdashboardapi.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(name = "James Nolan", email = "james.nolan@ecclesiastical.com"),
                description = "OpenApi documentation for Environment Dashboard",
                title = "OpenApi specification - Environment Dashboard",
                version = "1.0"
        ),
        servers = {
                @Server(description = "Local Environment", url = "http://localhost:8080/api/v1"),
        }
)
public class OpenApiConfig {
}
