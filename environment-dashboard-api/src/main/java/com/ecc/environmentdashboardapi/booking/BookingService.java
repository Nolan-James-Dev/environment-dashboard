package com.ecc.environmentdashboardapi.booking;

import java.util.List;

public interface BookingService {
    BookingResponse createBooking(BookingRequest request);

    List<BookingResponse> getBookingsForCurrentDay();

    List<BookingResponse> getCurrentDayBookingsForEnvironment(String name);

    List<BookingResponse> getBookingsByDate(String date);

}
