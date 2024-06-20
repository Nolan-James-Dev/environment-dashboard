package com.ecc.environmentdashboardapi.booking;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
    @Query("""
            SELECT (COUNT(*) > 0) as isBooked
            FROM Booking booking
            WHERE booking.environment.id = :environmentId
            AND booking.date = :date
            AND booking.startTime >= :startTime
            AND booking.endTime <= :endTime
            """)
    boolean bookingExists(Integer environmentId, LocalDate date, LocalTime startTime, LocalTime endTime);

    @Query("""
            SELECT booking
            FROM Booking booking
            WHERE booking.date = CURRENT_DATE
            """)
    List<Booking> getBookingsForCurrentDay();

    @Query("""
            SELECT booking
            FROM Booking booking
            WHERE booking.date = CURRENT_DATE
            AND booking.environment.name = :name
            """)
    List<Booking> getCurrentDayBookingsForEnvironment(String name);
}
