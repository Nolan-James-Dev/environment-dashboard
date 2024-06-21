package com.ecc.environmentdashboardapi.booking;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("bookings")
@RequiredArgsConstructor
@Tag(name = "Booking")
public class BookingController {
    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(@Valid @RequestBody BookingRequest request) {
        return ResponseEntity.ok(bookingService.createBooking(request));
    }

    @GetMapping
    public ResponseEntity<List<BookingResponse>> getBookingsForCurrentDay() {
        return ResponseEntity.ok(bookingService.getBookingsForCurrentDay());
    }

    @GetMapping("/{name}")
    public ResponseEntity<List<BookingResponse>> getCurrentDayBookingsForEnvironment(
            @PathVariable("name") String name) {
        return ResponseEntity.ok(bookingService.getCurrentDayBookingsForEnvironment(name));
    }

    @GetMapping("/date")
    public ResponseEntity<List<BookingResponse>> getBookingsByDate(
            @RequestParam String date) {
        return ResponseEntity.ok(bookingService.getBookingsByDate(date));

    }
}
