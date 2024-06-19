package com.ecc.environmentdashboardapi.booking;

import java.time.LocalDate;
import java.time.LocalTime;

public record BookingResponse(
        String username,
        String environment,
        LocalDate date,
        LocalTime startTime,
        LocalTime endTime,
        String reason
) {
}
