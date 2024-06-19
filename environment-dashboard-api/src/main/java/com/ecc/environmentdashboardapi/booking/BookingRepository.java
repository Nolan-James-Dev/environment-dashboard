package com.ecc.environmentdashboardapi.booking;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalTime;

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
}
