package com.ecc.environmentdashboardapi.booking;

import com.ecc.environmentdashboardapi.environment.Environment;
import com.ecc.environmentdashboardapi.environment.EnvironmentRepository;
import com.ecc.environmentdashboardapi.exception.BookingAlreadyExistsException;
import com.ecc.environmentdashboardapi.user.User;
import com.ecc.environmentdashboardapi.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.ecc.environmentdashboardapi.booking.BookingExceptionResponse.*;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final EnvironmentRepository environmentRepository;
    private final BookingMapper bookingMapper;

    @Override
    public BookingResponse createBooking(BookingRequest request) {
        boolean bookingExists = bookingExists(request);

        if (!bookingExists) {
            User user = userRepository.findById(request.userId())
                    .orElseThrow(() -> new EntityNotFoundException(NO_USER_ENTITY_FOUND_BY_ID));
            Environment environment = environmentRepository.findById(request.environmentId())
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

    private boolean bookingExists(BookingRequest request) {
        return bookingRepository.bookingExists(
                request.environmentId(),
                request.date(),
                request.startTime(),
                request.endTime()
        );
    }
}
