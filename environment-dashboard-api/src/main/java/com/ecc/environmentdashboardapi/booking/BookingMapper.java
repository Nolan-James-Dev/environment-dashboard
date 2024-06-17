package com.ecc.environmentdashboardapi.booking;

import org.springframework.stereotype.Service;

@Service
public class BookingMapper {
    public BookingResponse toBookingResponse(Booking booking) {
        return new BookingResponse(
                booking.getUser().getUsername(),
                booking.getEnvironment().getName(),
                booking.getDate(),
                booking.getStartTime(),
                booking.getEndTime(),
                booking.getReason()
        );
    }
}
