package com.ecc.environmentdashboardapi.booking;

import com.ecc.environmentdashboardapi.environment.Environment;
import com.ecc.environmentdashboardapi.environment.EnvironmentRepository;
import com.ecc.environmentdashboardapi.exception.BookingAlreadyExistsException;
import com.ecc.environmentdashboardapi.user.User;
import com.ecc.environmentdashboardapi.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.util.List;

import static com.ecc.environmentdashboardapi.booking.BookingExceptionResponse.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookingServiceImpl implements BookingService {
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final EnvironmentRepository environmentRepository;
    private final BookingMapper bookingMapper;

    @Override
    public BookingResponse createBooking(BookingRequest request) {
        log.info("User id {} attempting to create booking into {} on {} at {}",
                request.username(), request.environmentName(), request.date(), request.startTime());
        boolean bookingExists = bookingExists(request);

        if (!bookingExists) {
            User user = userRepository.findByUsername(request.username())
                    .orElseThrow(() -> new EntityNotFoundException(NO_USER_ENTITY_FOUND_BY_ID));
            Environment environment = environmentRepository.findByName(request.environmentName())
                    .orElseThrow(() -> new EntityNotFoundException(NO_ENVIRONMENT_ENTITY_FOUND_BY_ID));
            Booking booking = Booking.builder()
                    .user(user)
                    .environment(environment)
                    .date(request.date())
                    .startTime(request.startTime())
                    .endTime(request.endTime())
                    .reason(request.reason())
                    .build();
            Booking savedBooking = bookingRepository.save(booking);

            return bookingMapper.toBookingResponse(savedBooking);
        } else {
            throw new BookingAlreadyExistsException(BOOKING_ALREADY_EXISTS);
        }
    }

    @Override
    public List<BookingResponse> getBookingsForCurrentDay() {
        List<Booking> bookings = bookingRepository.getBookingsForCurrentDay();
        return bookings.stream()
                .map(bookingMapper::toBookingResponse)
                .toList();
    }

    private boolean bookingExists(BookingRequest request) {
        Environment environment = environmentRepository.findByName(request.environmentName())
                .orElseThrow(() -> new EntityNotFoundException(NO_ENVIRONMENT_ENTITY_FOUND_BY_ID));
        return bookingRepository.bookingExists(
                environment.getId(),
                request.date(),
                request.startTime(),
                request.endTime()
        );
    }
}
