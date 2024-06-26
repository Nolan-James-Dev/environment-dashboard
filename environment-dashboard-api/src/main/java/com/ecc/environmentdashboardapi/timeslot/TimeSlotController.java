package com.ecc.environmentdashboardapi.timeslot;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("timeslots")
@RequiredArgsConstructor
@Tag(name = "Timeslot")
public class TimeSlotController {
    private final TimeSlotService timeSlotService;

    @GetMapping
    public ResponseEntity<List<String>> getTimeSlots() {
        return ResponseEntity.ok(timeSlotService.getTimeSlots());
    }
}
